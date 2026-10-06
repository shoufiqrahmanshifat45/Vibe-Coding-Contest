/**
 * TenderFlow — i18n Localization Engine
 * Supports English and Bengali (বাংলা)
 */

export const translations = {
  en: {
    appTitle: "TenderFlow",
    tagline: "Intelligent Tender Package Builder",
    heroHeadline: "Turn tender documents into a submission-ready package.",
    heroSubtext: "Upload requirements and PDFs. Match, validate, resolve issues, and generate the final package — entirely in your browser.",
    privacyAssurance: "100% In-Browser • Zero Server Uploads",
    
    // Workflow Steps
    step1: "Requirements",
    step2: "Upload PDFs",
    step3: "Match Documents",
    step4: "Resolve Issues",
    step5: "Review Package",
    step6: "Generate & Download",
    
    // Tender Overview
    tenderOverview: "Tender Overview",
    tenderId: "Tender ID",
    procuringEntity: "Procuring Entity",
    bidder: "Bidder",
    submissionDeadline: "Submission Deadline",
    loadRequirementsBtn: "Load requirements.json",
    sampleTenders: "Load Sample Tender",
    exportProject: "Save Project",
    reopenProject: "Open Project",
    
    // Validation Metrics
    metricsTitle: "Validation & Compliance Overview",
    totalRequirements: "Total Requirements",
    readyOk: "Ready / OK",
    missing: "Missing",
    expiryNeeded: "Expiry Needed",
    expired: "Expired",
    optionalNotProvided: "Not Provided",
    duplicateFiles: "Duplicates",
    blockingIssues: "Blocking Issues",
    filterHint: "Click a metric to filter",
    clearFilter: "Clear Filter",
    
    // Statuses
    status_ok: "OK",
    status_missing: "Missing",
    status_expiry_needed: "Expiry date needed",
    status_expired: "Expired",
    status_not_provided: "Not provided",
    
    // Status descriptions / reasons
    reason_ok: "Document matched and valid for submission",
    reason_missing: "Mandatory document is missing a matched PDF",
    reason_expiry_needed: "Expiry date must be specified for this requirement",
    reason_expired: "Document has expired before the submission deadline",
    reason_not_provided: "Optional document is not provided (non-blocking)",
    
    // Blocking alerts
    allReadyTitle: "Ready to generate",
    allReadyDesc: "All required documents are validated and compliant. You can now generate the final tender submission package.",
    blockingTitle: "Package cannot be generated yet",
    blockingDesc: "The following issues must be resolved before generating the submission package:",
    
    // Requirements Checklist
    checklistTitle: "Requirements Checklist",
    mandatoryBadge: "Mandatory",
    optionalBadge: "Optional",
    expiryBadge: "Expiry Required",
    matchedFile: "Matched PDF",
    noFileMatched: "No file selected",
    selectFilePlaceholder: "-- Select uploaded PDF --",
    unmatchBtn: "Unmatch",
    expiryDateLabel: "Expiry Date:",
    autoMatchBtn: "Auto-Match",
    autoMatchModalTitle: "Auto-Match Suggestions",
    autoMatchApply: "Apply Suggestions",
    
    // PDF Library & Dropzone
    libraryTitle: "PDF Document Library",
    dropzoneMain: "Drag & drop tender PDF files here",
    dropzoneSub: "or browse files from your computer",
    dropzoneLimits: "Up to 30 PDF files • Max 50 MB total",
    storageUsed: "Storage used",
    filesCount: "Files uploaded",
    removeFile: "Remove file",
    duplicateBadge: "DUPLICATE",
    duplicateWarning: "Duplicate content detected with another file",
    duplicateMatchBlocked: "Cannot match duplicate file while another duplicate is already matched",
    
    // Actions & Generation
    readyToGenerate: "Ready to assemble package",
    packagePreview: "Package Structure Preview",
    generateBtn: "Generate Package",
    generating: "Assembling Final PDF...",
    downloadBtn: "Download Package",
    exportChecklistCsv: "Export Checklist (CSV)",
    
    // Preview & Options
    packageOptions: "Package Assembly Settings",
    includeIndexPage: "Include Table of Contents / Index Page",
    sealSignatureTool: "Digital Seal & Signature Stamp (PNG)",
    uploadSeal: "Upload PNG Seal/Signature",
    removeSeal: "Remove Seal",
    sealPlacement: "Stamp Placement",
    posBottomRight: "Cover Page - Bottom Right",
    posBottomLeft: "Cover Page - Bottom Left",
    posLastPage: "Last Page - Bottom Right",
    
    // Modals
    previewModalTitle: "Submission Package Preview & Inspection",
    close: "Close",
    totalPages: "Total Pages",
    startingPage: "Starting Page",
    
    // Errors & Notifications
    errInvalidJson: "Invalid requirements.json file. Please check that it is valid JSON.",
    errMissingFields: "The requirements.json is missing required fields (tender or requirements).",
    errOnlyPdf: "Only PDF files are allowed.",
    errFileLimit: "File limit exceeded. A maximum of 30 PDF files is supported.",
    errSizeLimit: "Total upload size exceeds the 50 MB limit.",
    errUnreadablePdf: "Unable to read this PDF. Please check that the file is valid and not password-protected.",
    projectSaved: "Project configuration successfully saved.",
    projectLoaded: "Project loaded successfully."
  },
  bn: {
    appTitle: "টেন্ডারফ্লো (TenderFlow)",
    tagline: "বুদ্ধিমান টেন্ডার প্যাকেজ প্রস্তুতকারক",
    heroHeadline: "টেন্ডার নথিগুলোকে জমা-উপযোগী প্যাকেজে রূপান্তর করুন।",
    heroSubtext: "রিকোয়ারমেন্ট ও পিডিএফ আপলোড করুন। ম্যাচ করুন, যাচাই করুন এবং সম্পূর্ণ ব্রাউজারেই চূড়ান্ত প্যাকেজ তৈরি করুন।",
    privacyAssurance: "১০০% ব্রাউজারে প্রক্রিয়াধীন • কোনো সার্ভার আপলোড নেই",
    
    // Workflow Steps
    step1: "রিকোয়ারমেন্ট",
    step2: "পিডিএফ আপলোড",
    step3: "নথি মিলকরণ",
    step4: "সমস্যা সমাধান",
    step5: "প্যাকেজ প্রিভিউ",
    step6: "প্যাকেজ তৈরি ও ডাউনলোড",
    
    // Tender Overview
    tenderOverview: "টেন্ডারের বিবরণ",
    tenderId: "টেন্ডার আইডি",
    procuringEntity: "সংগ্রহকারী সংস্থা",
    bidder: "দরপত্রদাতা",
    submissionDeadline: "জমা দেওয়ার শেষ তারিখ",
    loadRequirementsBtn: "requirements.json লোড করুন",
    sampleTenders: "নমুনা টেন্ডার লোড করুন",
    exportProject: "প্রজেক্ট সংরক্ষণ",
    reopenProject: "প্রজেক্ট খুলুন",
    
    // Validation Metrics
    metricsTitle: "যাচাই ও সম্মতি সারসংক্ষেপ",
    totalRequirements: "মোট প্রয়োজনীয়তা",
    readyOk: "প্রস্তুত / ঠিক আছে",
    missing: "অনুপস্থিত",
    expiryNeeded: "মেয়াদ প্রয়োজন",
    expired: "মেয়াদোত্তীর্ণ",
    optionalNotProvided: "প্রদান করা হয়নি",
    duplicateFiles: "ডুপ্লিকেট ফাইল",
    blockingIssues: "বাধা সৃষ্টিকারী সমস্যা",
    filterHint: "ফিল্টার করতে ক্লিক করুন",
    clearFilter: "ফিল্টার মুছুন",
    
    // Statuses
    status_ok: "ঠিক আছে (OK)",
    status_missing: "অনুপস্থিত (Missing)",
    status_expiry_needed: "মেয়াদ তারিখ প্রয়োজন",
    status_expired: "মেয়াদোত্তীর্ণ (Expired)",
    status_not_provided: "প্রদান করা হয়নি",
    
    // Status descriptions / reasons
    reason_ok: "নথি মেলানো হয়েছে এবং জমার জন্য প্রস্তুত",
    reason_missing: "বাধ্যতামূলক নথিটির সাথে কোনো পিডিএফ মেলানো হয়নি",
    reason_expiry_needed: "এই নথির মেয়াদ উত্তীর্ণের তারিখ প্রদান করতে হবে",
    reason_expired: "নথির মেয়াদ টেন্ডার জমার তারিখের আগেই শেষ হয়ে গেছে",
    reason_not_provided: "ঐচ্ছিক নথি প্রদান করা হয়নি (বাধ্যতামূলক নয়)",
    
    // Blocking alerts
    allReadyTitle: "প্যাকেজ তৈরির জন্য প্রস্তুত",
    allReadyDesc: "সকল আবশ্যক নথি সফলভাবে যাচাই করা হয়েছে। আপনি এখন চূড়ান্ত টেন্ডার প্যাকেজ তৈরি করতে পারেন।",
    blockingTitle: "প্যাকেজ এখনো তৈরি করা সম্ভব নয়",
    blockingDesc: "প্যাকেজ তৈরির পূর্বে নিচের সমস্যাগুলো সমাধান করতে হবে:",
    
    // Requirements Checklist
    checklistTitle: "প্রয়োজনীয় নথির তালিকা",
    mandatoryBadge: "বাধ্যতামূলক",
    optionalBadge: "ঐচ্ছিক",
    expiryBadge: "মেয়াদ আবশ্যক",
    matchedFile: "সংযুক্ত পিডিএফ",
    noFileMatched: "কোনো ফাইল নির্বাচিত নেই",
    selectFilePlaceholder: "-- আপলোডকৃত পিডিএফ নির্বাচন করুন --",
    unmatchBtn: "সংযোগ বিচ্ছিন্ন",
    expiryDateLabel: "মেয়াদ শেষ:",
    autoMatchBtn: "স্বয়ংক্রিয় ম্যাচ",
    autoMatchModalTitle: "স্বয়ংক্রিয় ম্যাচের পরামর্শ",
    autoMatchApply: "পরামর্শ প্রয়োগ করুন",
    
    // PDF Library & Dropzone
    libraryTitle: "পিডিএফ নথি লাইব্রেরি",
    dropzoneMain: "এখানে টেন্ডার পিডিএফ ফাইল টেনে এনে ছেড়ে দিন",
    dropzoneSub: "অথবা আপনার কম্পিউটার থেকে ব্রাউজ করুন",
    dropzoneLimits: "সর্বোচ্চ ৩০টি পিডিএফ • মোট সর্বোচ্চ ৫০ মেগাবাইট",
    storageUsed: "ব্যবহৃত স্থান",
    filesCount: "আপলোডকৃত ফাইল",
    removeFile: "ফাইল মুছুন",
    duplicateBadge: "ডুপ্লিকেট (DUPLICATE)",
    duplicateWarning: "অন্য একটি ফাইলের সাথে অবিকল বাইনারি মিল পাওয়া গেছে",
    duplicateMatchBlocked: "অন্য একটি ডুপ্লিকেট ফাইল ইতোমধ্যে ব্যবহৃত থাকায় এটি মেলানো যাবে না",
    
    // Actions & Generation
    readyToGenerate: "প্যাকেজ তৈরির জন্য প্রস্তুত",
    packagePreview: "প্যাকেজ কাঠামোর প্রিভিউ",
    generateBtn: "প্যাকেজ তৈরি করুন",
    generating: "চূড়ান্ত পিডিএফ সংযোজিত হচ্ছে...",
    downloadBtn: "প্যাকেজ ডাউনলোড করুন",
    exportChecklistCsv: "চেকলিস্ট এক্সপোর্ট (CSV)",
    
    // Preview & Options
    packageOptions: "প্যাকেজ অ্যাসেম্বলি সেটিংস",
    includeIndexPage: "সূচিপত্র / ইনডেক্স পেজ যুক্ত করুন",
    sealSignatureTool: "ডিজিটাল সিল ও স্বাক্ষর (PNG)",
    uploadSeal: "PNG সিল/স্বাক্ষর আপলোড",
    removeSeal: "সিল মুছুন",
    sealPlacement: "সিলের অবস্থান",
    posBottomRight: "কভার পেজ - নিচে ডানে",
    posBottomLeft: "কভার পেজ - নিচে বামে",
    posLastPage: "শেষ পেজ - নিচে ডানে",
    
    // Modals
    previewModalTitle: "টেন্ডার প্যাকেজ প্রিভিউ ও পরিদর্শন",
    close: "বন্ধ করুন",
    totalPages: "মোট পৃষ্ঠা",
    startingPage: "শুরুর পৃষ্ঠা",
    
    // Errors & Notifications
    errInvalidJson: "requirements.json ফাইলটি সঠিক নয়। অনুগ্রহ করে ফরম্যাট পরীক্ষা করুন।",
    errMissingFields: "requirements.json-এ আবশ্যক তথ্য (tender অথবা requirements) অনুপস্থিত।",
    errOnlyPdf: "শুধুমাত্র পিডিএফ (PDF) ফাইল আপলোড করা যাবে।",
    errFileLimit: "ফাইলের সীমা অতিক্রম করেছে। সর্বোচ্চ ৩০টি ফাইল অনুমোদিত।",
    errSizeLimit: "মোট ফাইলের আকার ৫০ মেগাবাইটের বেশি হয়ে গেছে।",
    errUnreadablePdf: "পিডিএফটি পড়া যাচ্ছে না। ফাইলটি ত্রুটিমুক্ত ও পাসওয়ার্ডহীন কিনা পরীক্ষা করুন।",
    projectSaved: "প্রজেক্ট কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে।",
    projectLoaded: "প্রজেক্ট সফলভাবে খোলা হয়েছে।"
  }
};

let currentLang = 'en';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (translations[lang]) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
  }
}

export function t(key, fallback = '') {
  const dict = translations[currentLang] || translations.en;
  return dict[key] || translations.en[key] || fallback || key;
}
