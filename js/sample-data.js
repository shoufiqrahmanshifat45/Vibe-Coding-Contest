/**
 * TenderFlow — Sample Data & Demonstration Pack Generator
 * 
 * Provides:
 * - Official requirements.json presets
 * - Function to download clean sample requirements.json
 * - In-browser PDF generator for generating realistic sample test PDFs (including duplicate pair)
 */

export const SAMPLE_TENDERS = {
  standard_ict: {
    tender: {
      tender_id: "T-2026-0417",
      title: "Procurement of High-Performance IT Infrastructure & Datacenter Workstations",
      procuring_entity: "Department of Digital Transformation",
      bidder: "Apex Technologies & Solutions Ltd.",
      submission_deadline: "2026-11-30"
    },
    requirements: [
      {
        id: "req-1",
        order: 1,
        title_en: "Trade License",
        title_bn: "ট্রেড লাইসেন্স",
        mandatory: true,
        has_expiry: true
      },
      {
        id: "req-2",
        order: 2,
        title_en: "TIN Certificate",
        title_bn: "টিআইএন সার্টিফিকেট",
        mandatory: true,
        has_expiry: false
      },
      {
        id: "req-3",
        order: 3,
        title_en: "VAT Registration Certificate",
        title_bn: "ভ্যাট নিবন্ধন সনদ",
        mandatory: true,
        has_expiry: false
      },
      {
        id: "req-4",
        order: 4,
        title_en: "Bank Solvency Certificate",
        title_bn: "ব্যাংক সচ্ছলতা সনদ",
        mandatory: true,
        has_expiry: true
      },
      {
        id: "req-5",
        order: 5,
        title_en: "Manufacturer Authorization Form (MAF)",
        title_bn: "প্রস্তুতকারকের অনুমোদন পত্র (এমএএফ)",
        mandatory: true,
        has_expiry: false
      },
      {
        id: "req-6",
        order: 6,
        title_en: "ISO 9001:2015 Quality Certificate",
        title_bn: "আইএসও ৯০০১ গুণমান সনদ",
        mandatory: false,
        has_expiry: true
      },
      {
        id: "req-7",
        order: 7,
        title_en: "Past Experience Completion Certificates",
        title_bn: "পূর্ববর্তী অভিজ্ঞতা সমাপ্তির সনদ",
        mandatory: true,
        has_expiry: false
      },
      {
        id: "req-8",
        order: 8,
        title_en: "Litigation History Affidavit",
        title_bn: "মামলা সংক্রান্ত হলফনামা",
        mandatory: false,
        has_expiry: false
      }
    ]
  },
  medical_supplies: {
    tender: {
      tender_id: "MED-2026-8802",
      title: "Supply and Commissioning of Advanced Diagnostic Imaging Equipment",
      procuring_entity: "Directorate General of Health Services",
      bidder: "MedEquip Global Healthcare Ltd.",
      submission_deadline: "2026-12-15"
    },
    requirements: [
      { id: "m-1", order: 1, title_en: "Drug Administration License", title_bn: "ওষুধ প্রশাসন লাইসেন্স", mandatory: true, has_expiry: true },
      { id: "m-2", order: 2, title_en: "Medical Device Import Clearance", title_bn: "আমদানি অনুমতি সনদ", mandatory: true, has_expiry: true },
      { id: "m-3", order: 3, title_en: "Tax Clearance Certificate", title_bn: "কর পরিশোধ প্রত্যয়নপত্র", mandatory: true, has_expiry: false },
      { id: "m-4", order: 4, title_en: "CE / FDA Medical Device Approval", title_bn: "সিই / এফডিএ অনুমোদন", mandatory: true, has_expiry: false },
      { id: "m-5", order: 5, title_en: "Warranty & Maintenance Undertaking", title_bn: "ওয়ারেন্টি ও রক্ষণাবেক্ষণ অঙ্গীকারনামা", mandatory: false, has_expiry: false }
    ]
  }
};

/**
 * Downloads the sample requirements.json file to the user's computer
 */
export function downloadSampleRequirementsJson(presetKey = 'standard_ict') {
  const data = SAMPLE_TENDERS[presetKey] || SAMPLE_TENDERS.standard_ict;
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = "requirements.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/**
 * Generates an authentic multi-page PDF document using pdf-lib
 * 
 * @param {string} title - Document title
 * @param {number} numPages - Page count
 * @param {string} issuer - Issuing authority
 * @returns {Promise<Uint8Array>}
 */
async function generateSamplePdfDoc(title, numPages, issuer) {
  const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg = await doc.embedFont(StandardFonts.Helvetica);

  for (let i = 1; i <= numPages; i++) {
    const page = doc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();

    // Top banner
    page.drawRectangle({
      x: 40,
      y: height - 80,
      width: width - 80,
      height: 40,
      color: rgb(0.92, 0.95, 0.98)
    });

    page.drawText(issuer.toUpperCase(), {
      x: 55,
      y: height - 64,
      size: 11,
      font: fontBold,
      color: rgb(0.12, 0.23, 0.54)
    });

    // Main Title
    page.drawText(title, {
      x: 55,
      y: height - 120,
      size: 16,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1)
    });

    page.drawText(`Page ${i} of ${numPages} • Document Verification Serial: DOC-${Math.floor(100000 + Math.random() * 900000)}`, {
      x: 55,
      y: height - 145,
      size: 9,
      font: fontReg,
      color: rgb(0.4, 0.45, 0.5)
    });

    // Content body box
    page.drawRectangle({
      x: 55,
      y: height - 340,
      width: width - 110,
      height: 170,
      borderColor: rgb(0.85, 0.88, 0.92),
      borderWidth: 1
    });

    page.drawText("CERTIFICATE OF OFFICIAL RECORD", {
      x: 75,
      y: height - 200,
      size: 12,
      font: fontBold,
      color: rgb(0.12, 0.23, 0.54)
    });

    page.drawText(`This document constitutes an official submission document for "${title}".`, {
      x: 75,
      y: height - 225,
      size: 10,
      font: fontReg,
      color: rgb(0.2, 0.2, 0.2)
    });

    page.drawText(`Issued to: Apex Technologies & Solutions Ltd.`, {
      x: 75,
      y: height - 245,
      size: 10,
      font: fontReg,
      color: rgb(0.2, 0.2, 0.2)
    });

    page.drawText(`Section ${i}: All terms and certifications herein are attested and validated.`, {
      x: 75,
      y: height - 265,
      size: 9.5,
      font: fontReg,
      color: rgb(0.3, 0.3, 0.3)
    });
  }

  return await doc.save();
}

/**
 * Generates an array of real test PDF File objects
 * Includes two files with identical binary bytes to trigger real cryptographic duplicate detection!
 */
export async function generateDemoPdfFiles() {
  if (!window.PDFLib) {
    throw new Error("PDFLib library is loading. Please try again in a moment.");
  }

  const files = [];

  // 1. Trade License (2 pages)
  const tradeBytes = await generateSamplePdfDoc("TRADE LICENSE CERTIFICATE", 2, "City Corporation Licensing Authority");
  files.push(new File([tradeBytes], "Trade_License_2026.pdf", { type: "application/pdf" }));

  // 2. Exact Duplicate of Trade License with a different filename!
  // Same binary content -> identical SHA-256 hash
  files.push(new File([tradeBytes], "Trade_License_COPY_DUPLICATE.pdf", { type: "application/pdf" }));

  // 3. TIN Certificate (1 page)
  const tinBytes = await generateSamplePdfDoc("TAX IDENTIFICATION NUMBER (TIN) CERTIFICATE", 1, "National Board of Revenue");
  files.push(new File([tinBytes], "TIN_Certificate_eTIN.pdf", { type: "application/pdf" }));

  // 4. VAT Registration (1 page)
  const vatBytes = await generateSamplePdfDoc("VALUE ADDED TAX (VAT) REGISTRATION", 1, "Customs, Excise and VAT Commissionerate");
  files.push(new File([vatBytes], "VAT_Registration_BIN.pdf", { type: "application/pdf" }));

  // 5. Bank Solvency Certificate (2 pages)
  const bankBytes = await generateSamplePdfDoc("BANK SOLVENCY & CREDIT CAPACITY CERTIFICATE", 2, "Premier Commercial Bank PLC");
  files.push(new File([bankBytes], "Bank_Solvency_Certificate.pdf", { type: "application/pdf" }));

  // 6. Manufacturer Authorization Form (1 page)
  const mafBytes = await generateSamplePdfDoc("MANUFACTURER AUTHORIZATION FORM (MAF)", 1, "Global Enterprise Systems OEM");
  files.push(new File([mafBytes], "Manufacturer_Authorization_MAF.pdf", { type: "application/pdf" }));

  // 7. ISO 9001 Certificate (2 pages)
  const isoBytes = await generateSamplePdfDoc("ISO 9001:2015 QUALITY MANAGEMENT CERTIFICATE", 2, "International Accreditation Board");
  files.push(new File([isoBytes], "ISO_9001_Quality_Cert.pdf", { type: "application/pdf" }));

  // 8. Past Experience Certificates (3 pages)
  const expBytes = await generateSamplePdfDoc("PAST PROJECT COMPLETION CERTIFICATES", 3, "Central Procurement Technical Unit");
  files.push(new File([expBytes], "Past_Experience_Completion_Certs.pdf", { type: "application/pdf" }));

  return files;
}
