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

function sha256Fallback(bytes) {
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  let H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const l = bytes.length;
  const bitLen = l * 8;
  const padLen = (l % 64 < 56) ? (56 - (l % 64)) : (120 - (l % 64));
  const totalLen = l + padLen + 8;
  const msg = new Uint8Array(totalLen);
  msg.set(bytes);
  msg[l] = 0x80;
  const view = new DataView(msg.buffer);
  view.setUint32(totalLen - 4, bitLen, false);

  const W = new Uint32Array(64);
  for (let i = 0; i < totalLen; i += 64) {
    for (let t = 0; t < 16; t++) {
      W[t] = view.getUint32(i + t * 4, false);
    }
    for (let t = 16; t < 64; t++) {
      const s0 = ((W[t-15] >>> 7) | (W[t-15] << 25)) ^ ((W[t-15] >>> 18) | (W[t-15] << 14)) ^ (W[t-15] >>> 3);
      const s1 = ((W[t-2] >>> 17) | (W[t-2] << 15)) ^ ((W[t-2] >>> 19) | (W[t-2] << 13)) ^ (W[t-2] >>> 10);
      W[t] = (W[t-16] + s0 + W[t-7] + s1) | 0;
    }
    let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
    for (let t = 0; t < 64; t++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[t] + W[t]) | 0;
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;
      h = g; g = f; f = e; e = (d + temp1) | 0;
      d = c; c = b; b = a; a = (temp1 + temp2) | 0;
    }
    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0;
    H[5] = (H[5] + f) | 0;
    H[6] = (H[6] + g) | 0;
    H[7] = (H[7] + h) | 0;
  }
  return H.map(v => (v >>> 0).toString(16).padStart(8, '0')).join('');
}

/**
 * Calculates SHA-256 cryptographic hash of an ArrayBuffer
 */
export async function calculateSha256(arrayBuffer) {
  if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (err) {
      console.warn("SubtleCrypto failed, using pure JS hasher:", err);
    }
  }
  return sha256Fallback(new Uint8Array(arrayBuffer));
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
