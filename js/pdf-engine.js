/**
 * TenderFlow — PDF Processing & Assembly Engine
 * 
 * Powered by pdf-lib (100% in-browser client-side execution).
 * Handles:
 * - Real page count inspection
 * - SHA-256 cryptographic binary duplicate detection
 * - English Cover Page generation
 * - Table of Contents / Index page with real computed starting page numbers
 * - Multi-document sequential page merging
 * - Uniform "<tender_id> | Page X of Y" footers on EVERY page
 * - Digital Seal & Signature PNG stamping
 */

/**
 * Calculates SHA-256 cryptographic hash of an ArrayBuffer using Web Crypto API
 */
export async function calculateSha256(arrayBuffer) {
  try {
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error("Hashing error:", err);
    throw new Error("Failed to calculate cryptographic hash.");
  }
}

/**
 * Inspects a PDF file: reads binary data, calculates SHA-256 hash, and gets page count.
 * Catches password-protected or corrupted PDFs safely without crashing.
 * 
 * @param {File} file 
 * @returns {Promise<Object>} { arrayBuffer, pageCount, hash }
 */
export async function inspectPdfFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  
  // Calculate binary hash
  const hash = await calculateSha256(arrayBuffer);

  // Parse PDF to get page count safely
  if (!window.PDFLib) {
    throw new Error("PDF processing engine is not ready yet. Please refresh the page.");
  }

  const { PDFDocument } = window.PDFLib;
  let pageCount = 0;

  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    pageCount = pdfDoc.getPageCount();
  } catch (err) {
    console.warn("PDF inspection failure:", file.name, err);
    throw new Error("Unable to read this PDF. Please check that the file is valid and not password-protected.");
  }

  if (pageCount < 1) {
    throw new Error("PDF file contains no readable pages.");
  }

  return {
    arrayBuffer,
    pageCount,
    hash
  };
}

/**
 * Assembles the complete tender package PDF
 * 
 * @param {Object} options
 * @param {Object} options.tender - Tender metadata
 * @param {Array} options.orderedRequirements - Requirements in final order
 * @param {Map} options.statusMap - Status mapping from status-engine
 * @param {boolean} options.includeIndexPage - Whether to generate an index/table of contents
 * @param {Object|null} options.signatureConfig - Signature PNG configuration
 * @param {Function} options.onProgress - Progress callback (percentage, message)
 * @returns {Promise<Uint8Array>} Assembled PDF binary bytes
 */
export async function assembleTenderPackage({
  tender,
  orderedRequirements,
  statusMap,
  includeIndexPage = true,
  signatureConfig = null,
  onProgress = () => {}
}) {
  if (!window.PDFLib) {
    throw new Error("PDF engine not initialized.");
  }

  const { PDFDocument, rgb, StandardFonts } = window.PDFLib;

  onProgress(10, "Initializing package document...");
  const packageDoc = await PDFDocument.create();

  // Embed standard typography fonts
  const fontRegular = await packageDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await packageDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await packageDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette colors for PDF layout
  const primaryColor = rgb(0.12, 0.23, 0.54);   // Deep Navy (#1e3a8a)
  const secondaryColor = rgb(0.01, 0.52, 0.78); // Blue (#0284c7)
  const textColor = rgb(0.1, 0.1, 0.1);
  const textMuted = rgb(0.4, 0.45, 0.5);
  const borderColor = rgb(0.85, 0.88, 0.92);
  const rowBgAlt = rgb(0.97, 0.98, 0.99);

  // Prepare list of included documents in order (skipping unmatched optional documents)
  const includedDocs = [];
  for (const req of orderedRequirements) {
    const statusData = statusMap.get(req.id);
    if (statusData && statusData.matchedFile) {
      includedDocs.push({
        req,
        file: statusData.matchedFile,
        expiryDate: statusData.expiryDate || 'N/A'
      });
    }
  }

  // --- 1. GENERATE OFFICIAL COVER PAGE (Page 1) ---
  onProgress(20, "Creating official cover page...");
  const coverPage = packageDoc.addPage([595.28, 841.89]); // A4 dimensions in points (pt)
  const { width: cWidth, height: cHeight } = coverPage.getSize();

  // Decorative header band
  coverPage.drawRectangle({
    x: 0,
    y: cHeight - 16,
    width: cWidth,
    height: 16,
    color: primaryColor
  });

  // Border frame
  coverPage.drawRectangle({
    x: 36,
    y: 36,
    width: cWidth - 72,
    height: cHeight - 72,
    borderColor: borderColor,
    borderWidth: 1.5
  });

  let curY = cHeight - 65;

  // Header Title
  const headerSuper = "OFFICIAL TENDER SUBMISSION PACKAGE";
  coverPage.drawText(headerSuper, {
    x: 54,
    y: curY,
    size: 13,
    font: fontBold,
    color: secondaryColor
  });

  curY -= 28;
  const tenderIdText = `TENDER REF: ${tender.tender_id || 'N/A'}`;
  coverPage.drawText(tenderIdText, {
    x: 54,
    y: curY,
    size: 20,
    font: fontBold,
    color: primaryColor
  });

  curY -= 14;
  // Decorative separator
  coverPage.drawLine({
    start: { x: 54, y: curY },
    end: { x: cWidth - 54, y: curY },
    thickness: 2,
    color: secondaryColor
  });

  // Tender Title Box
  curY -= 26;
  coverPage.drawText("PROJECT / TENDER TITLE:", {
    x: 54,
    y: curY,
    size: 8.5,
    font: fontBold,
    color: textMuted
  });

  curY -= 18;
  const safeTitle = tender.title || 'Untitled Tender';
  // Simple word wrapping for tender title
  const titleWords = safeTitle.split(' ');
  let titleLine = '';
  for (const word of titleWords) {
    const testLine = titleLine ? `${titleLine} ${word}` : word;
    if (fontBold.widthOfTextAtSize(testLine, 12) > (cWidth - 110)) {
      coverPage.drawText(titleLine, { x: 54, y: curY, size: 12, font: fontBold, color: textColor });
      curY -= 16;
      titleLine = word;
    } else {
      titleLine = testLine;
    }
  }
  if (titleLine) {
    coverPage.drawText(titleLine, { x: 54, y: curY, size: 12, font: fontBold, color: textColor });
    curY -= 20;
  }

  // Two-column Metadata Grid
  const gridStartY = curY;
  const col1X = 54;
  const col2X = 310;

  // Procuring Entity
  coverPage.drawText("PROCURING ENTITY:", { x: col1X, y: gridStartY, size: 8, font: fontBold, color: textMuted });
  coverPage.drawText(tender.procuring_entity || 'N/A', { x: col1X, y: gridStartY - 15, size: 11, font: fontRegular, color: textColor });

  // Bidder / Contractor
  coverPage.drawText("BIDDER / TENDERER:", { x: col2X, y: gridStartY, size: 8, font: fontBold, color: textMuted });
  coverPage.drawText(tender.bidder || 'N/A', { x: col2X, y: gridStartY - 15, size: 11, font: fontBold, color: primaryColor });

  // Submission Deadline & Package Creation Date
  coverPage.drawText("SUBMISSION DEADLINE:", { x: col1X, y: gridStartY - 40, size: 8, font: fontBold, color: textMuted });
  coverPage.drawText(tender.submission_deadline || 'N/A', { x: col1X, y: gridStartY - 55, size: 11, font: fontBold, color: rgb(0.8, 0.2, 0.2) });

  const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  coverPage.drawText("PACKAGE ASSEMBLED ON:", { x: col2X, y: gridStartY - 40, size: 8, font: fontBold, color: textMuted });
  coverPage.drawText(nowFormatted, { x: col2X, y: gridStartY - 55, size: 10, font: fontRegular, color: textColor });

  curY = gridStartY - 80;

  // Enclosed Documents Schedule Header
  coverPage.drawText("SCHEDULE OF ENCLOSED DOCUMENTS (IN SUBMISSION ORDER):", {
    x: 54,
    y: curY,
    size: 9,
    font: fontBold,
    color: primaryColor
  });

  curY -= 14;

  // Table header background
  coverPage.drawRectangle({
    x: 54,
    y: curY - 6,
    width: cWidth - 108,
    height: 18,
    color: primaryColor
  });

  coverPage.drawText("#", { x: 60, y: curY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  coverPage.drawText("DOCUMENT TITLE", { x: 80, y: curY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  coverPage.drawText("SOURCE FILE", { x: 260, y: curY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  coverPage.drawText("PAGES", { x: 420, y: curY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
  coverPage.drawText("EXPIRY DATE", { x: 480, y: curY, size: 8, font: fontBold, color: rgb(1, 1, 1) });

  curY -= 20;

  // Render Table Rows (capped to fit cover page cleanly)
  let rowIdx = 0;
  for (const item of includedDocs) {
    if (curY < 120) {
      // If table overflows, show overflow indicator
      coverPage.drawText(`... and ${includedDocs.length - rowIdx} additional document(s) (see Index page)`, {
        x: 60,
        y: curY,
        size: 8,
        font: fontOblique,
        color: textMuted
      });
      curY -= 16;
      break;
    }

    if (rowIdx % 2 === 1) {
      coverPage.drawRectangle({
        x: 54,
        y: curY - 4,
        width: cWidth - 108,
        height: 16,
        color: rowBgAlt
      });
    }

    const orderNum = String(item.req.order || (rowIdx + 1));
    const titleText = item.req.title_en.substring(0, 32);
    const fileNameText = item.file.filename.substring(0, 26);
    const pageText = String(item.file.pageCount || 1);
    const expiryText = item.expiryDate || 'N/A';

    coverPage.drawText(orderNum, { x: 60, y: curY, size: 8, font: fontBold, color: textColor });
    coverPage.drawText(titleText, { x: 80, y: curY, size: 8, font: fontRegular, color: textColor });
    coverPage.drawText(fileNameText, { x: 260, y: curY, size: 7.5, font: fontRegular, color: textMuted });
    coverPage.drawText(pageText, { x: 430, y: curY, size: 8, font: fontRegular, color: textColor });
    coverPage.drawText(expiryText, { x: 480, y: curY, size: 8, font: fontRegular, color: textColor });

    curY -= 16;
    rowIdx++;
  }

  // Cover Page Bottom Sign-off Box
  coverPage.drawRectangle({
    x: 54,
    y: 50,
    width: cWidth - 108,
    height: 52,
    borderColor: borderColor,
    borderWidth: 1,
    color: rgb(0.98, 0.99, 1.0)
  });

  coverPage.drawText("AUTHORIZED SUBMISSION VERIFICATION:", {
    x: 62,
    y: 90,
    size: 7.5,
    font: fontBold,
    color: primaryColor
  });

  coverPage.drawText("All enclosed documents have been compiled in strict accordance with the tender requirements.", {
    x: 62,
    y: 78,
    size: 7,
    font: fontRegular,
    color: textMuted
  });

  coverPage.drawText("Compiled locally via TenderFlow Intelligent Package Builder.", {
    x: 62,
    y: 64,
    size: 6.5,
    font: fontOblique,
    color: textMuted
  });


  // --- 2. OPTIONAL INDEX / TABLE OF CONTENTS PAGE (Page 2) ---
  let indexPage = null;
  const startingPageMap = new Map(); // reqId -> startingPageNumber

  let runningPageNumber = 1 + (includeIndexPage ? 1 : 0); // Starting page for first attached document

  for (const item of includedDocs) {
    startingPageMap.set(item.req.id, runningPageNumber + 1);
    runningPageNumber += (item.file.pageCount || 1);
  }

  if (includeIndexPage) {
    onProgress(35, "Generating Table of Contents / Index...");
    indexPage = packageDoc.addPage([595.28, 841.89]);
    const { width: iWidth, height: iHeight } = indexPage.getSize();

    // Border frame
    indexPage.drawRectangle({
      x: 36,
      y: 36,
      width: iWidth - 72,
      height: iHeight - 72,
      borderColor: borderColor,
      borderWidth: 1.5
    });

    let iY = iHeight - 70;
    indexPage.drawText("TABLE OF CONTENTS / DOCUMENT INDEX", {
      x: 54,
      y: iY,
      size: 16,
      font: fontBold,
      color: primaryColor
    });

    iY -= 12;
    indexPage.drawLine({
      start: { x: 54, y: iY },
      end: { x: iWidth - 54, y: iY },
      thickness: 1.5,
      color: secondaryColor
    });

    iY -= 20;
    indexPage.drawText("The following index details all documents enclosed in this package with their respective starting pages:", {
      x: 54,
      y: iY,
      size: 9,
      font: fontRegular,
      color: textMuted
    });

    iY -= 25;

    // Index Table Header
    indexPage.drawRectangle({
      x: 54,
      y: iY - 6,
      width: iWidth - 108,
      height: 18,
      color: primaryColor
    });

    indexPage.drawText("ORDER", { x: 60, y: iY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
    indexPage.drawText("REQUIREMENT NAME", { x: 105, y: iY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
    indexPage.drawText("ATTACHED FILE", { x: 290, y: iY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
    indexPage.drawText("PAGES", { x: 420, y: iY, size: 8, font: fontBold, color: rgb(1, 1, 1) });
    indexPage.drawText("PAGE NO.", { x: 480, y: iY, size: 8, font: fontBold, color: rgb(1, 1, 1) });

    iY -= 20;

    // Index Table Rows
    let idxNum = 0;
    for (const item of includedDocs) {
      if (idxNum % 2 === 1) {
        indexPage.drawRectangle({
          x: 54,
          y: iY - 4,
          width: iWidth - 108,
          height: 16,
          color: rowBgAlt
        });
      }

      const startPg = startingPageMap.get(item.req.id);
      const endPg = startPg + (item.file.pageCount || 1) - 1;
      const pageSpan = (item.file.pageCount > 1) ? `pp. ${startPg} - ${endPg}` : `p. ${startPg}`;

      indexPage.drawText(String(item.req.order), { x: 65, y: iY, size: 8.5, font: fontBold, color: textColor });
      indexPage.drawText(item.req.title_en.substring(0, 32), { x: 105, y: iY, size: 8.5, font: fontRegular, color: textColor });
      indexPage.drawText(item.file.filename.substring(0, 24), { x: 290, y: iY, size: 8, font: fontRegular, color: textMuted });
      indexPage.drawText(String(item.file.pageCount), { x: 430, y: iY, size: 8.5, font: fontRegular, color: textColor });
      indexPage.drawText(pageSpan, { x: 480, y: iY, size: 8.5, font: fontBold, color: primaryColor });

      iY -= 18;
      idxNum++;
    }
  }


  // --- 3. MERGE MATCHED PDF DOCUMENTS IN EXACT ORDER ---
  let docCount = 0;
  for (const item of includedDocs) {
    docCount++;
    const progressPercent = 40 + Math.round((docCount / includedDocs.length) * 40);
    onProgress(progressPercent, `Merging document ${docCount}/${includedDocs.length}: ${item.file.filename}...`);

    try {
      const srcDoc = await PDFDocument.load(item.file.arrayBuffer, { ignoreEncryption: true });
      const pageIndices = srcDoc.getPageIndices();
      const copiedPages = await packageDoc.copyPages(srcDoc, pageIndices);

      for (const page of copiedPages) {
        packageDoc.addPage(page);
      }
    } catch (err) {
      console.error(`Error copying pages from ${item.file.filename}:`, err);
      throw new Error(`Failed to merge document "${item.file.filename}". File may be corrupted.`);
    }
  }


  // --- 4. SIGNATURE / SEAL PNG EMBEDDING (IF PROVIDED) ---
  if (signatureConfig && signatureConfig.dataUrl) {
    try {
      onProgress(85, "Stamping digital seal and signature...");
      const pngImageBytes = await fetch(signatureConfig.dataUrl).then(res => res.arrayBuffer());
      const embeddedPng = await packageDoc.embedPng(pngImageBytes);

      const targetPlacement = signatureConfig.placement || 'cover-bottom-right';
      const scale = (signatureConfig.scale || 100) / 100;
      const pngDims = embeddedPng.scale(0.3 * scale);

      let targetPage = coverPage;
      if (targetPlacement === 'last-bottom-right') {
        const pages = packageDoc.getPages();
        targetPage = pages[pages.length - 1];
      }

      const { width: pW } = targetPage.getSize();
      let stampX = pW - pngDims.width - 55;
      let stampY = 56;

      if (targetPlacement === 'cover-bottom-left') {
        stampX = 55;
      }

      targetPage.drawImage(embeddedPng, {
        x: stampX,
        y: stampY,
        width: pngDims.width,
        height: pngDims.height
      });
    } catch (err) {
      console.warn("Could not embed signature image:", err);
    }
  }


  // --- 5. STAMP UNIFORM FOOTERS ON EVERY PAGE ("<tender_id> | Page X of Y") ---
  onProgress(90, "Applying dynamic pagination footers...");
  const totalFinalPages = packageDoc.getPageCount();
  const pages = packageDoc.getPages();

  for (let idx = 0; idx < totalFinalPages; idx++) {
    const page = pages[idx];
    const { width: pWidth } = page.getSize();
    const pageNumber = idx + 1;
    const footerText = `${tender.tender_id || 'TenderFlow'} | Page ${pageNumber} of ${totalFinalPages}`;

    // Calculate text width for center alignment
    const textWidth = fontRegular.widthOfTextAtSize(footerText, 8);
    const footerX = (pWidth - textWidth) / 2;
    const footerY = 16; // bottom margin

    // Subtle divider rule above footer
    page.drawLine({
      start: { x: 36, y: footerY + 12 },
      end: { x: pWidth - 36, y: footerY + 12 },
      thickness: 0.5,
      color: rgb(0.85, 0.85, 0.85)
    });

    page.drawText(footerText, {
      x: footerX,
      y: footerY,
      size: 8,
      font: fontRegular,
      color: textMuted
    });
  }

  // --- 6. SAVE & RETURN FINAL PDF BYTES ---
  onProgress(98, "Finalizing and serializing PDF bytes...");
  const pdfBytes = await packageDoc.save();
  onProgress(100, "Package generated successfully!");

  return pdfBytes;
}

/**
 * Initiates browser download of the generated PDF package
 * Strictly named: <tender_id>_Package.pdf
 */
export function downloadPackagePdf(pdfBytes, tenderId) {
  const cleanTenderId = (tenderId || "TENDER").replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanTenderId}_Package.pdf`;

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Clean up object URL after delay
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 15000);

  return filename;
}
