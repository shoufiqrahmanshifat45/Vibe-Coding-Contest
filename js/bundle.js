/**
 * TenderFlow — Intelligent Tender Package Builder
 * Production Universal Bundle (Offline & file:// Protocol Compatible)
 * AI DevFest Vibe Coding Contest
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. i18n Localization Engine (English & Bangla)
     ========================================================================== */

  const translations = {
    en: {
      appTitle: "TenderFlow",
      tagline: "Intelligent Tender Package Builder",
      heroHeadline: "Turn tender documents into a submission-ready package.",
      heroSubtext: "Upload requirements and PDFs. Match, validate, resolve issues, and generate the final package — entirely in your browser.",
      privacyAssurance: "100% In-Browser • Zero Server Uploads",
      step1: "Requirements",
      step2: "Upload PDFs",
      step3: "Match Documents",
      step4: "Resolve Issues",
      step5: "Generate & Download",
      tenderOverview: "Tender Overview",
      tenderId: "Tender ID",
      procuringEntity: "Procuring Entity",
      bidder: "Bidder",
      submissionDeadline: "Submission Deadline",
      loadRequirementsBtn: "Load requirements.json",
      sampleTenders: "Load Sample Tender",
      exportProject: "Save Project",
      reopenProject: "Open Project",
      metricsTitle: "Compliance & Readiness Status",
      totalRequirements: "Total Requirements",
      readyOk: "Ready / Valid",
      missing: "Missing",
      expiryNeeded: "Expiry Needed",
      expired: "Expired",
      optionalNotProvided: "Not Provided",
      duplicateFiles: "Duplicates",
      blockingIssues: "Blocking Issues",
      filterHint: "Click a metric to filter",
      clearFilter: "Clear Filter",
      status_ok: "OK",
      status_missing: "Missing",
      status_expiry_needed: "Expiry date needed",
      status_expired: "Expired",
      status_not_provided: "Not provided",
      reason_ok: "Document matched and valid for submission",
      reason_missing: "Mandatory document is missing a matched PDF",
      reason_expiry_needed: "Expiry date must be specified for this requirement",
      reason_expired: "Document has expired before the submission deadline",
      reason_not_provided: "Optional document is not provided (non-blocking)",
      allReadyTitle: "Ready to assemble package",
      allReadyDesc: "All required documents are validated and compliant. You can now generate the final tender submission package.",
      blockingTitle: "Package cannot be generated yet",
      blockingDesc: "The following issues must be resolved before generating the submission package:",
      checklistTitle: "Requirements Checklist",
      mandatoryBadge: "Mandatory",
      optionalBadge: "Optional",
      expiryBadge: "Expiry Required",
      matchedFile: "Matched PDF",
      noFileMatched: "No file selected",
      selectFilePlaceholder: "-- Select uploaded PDF --",
      unmatchBtn: "Unmatch",
      expiryDateLabel: "Expiry Date:",
      autoMatchBtn: "Auto-Match Suggestions",
      autoMatchModalTitle: "Auto-Match Suggestions",
      autoMatchApply: "Apply Selected Matches",
      libraryTitle: "PDF Document Library",
      dropzoneMain: "Drop tender PDF files here",
      dropzoneSub: "or click to browse from computer",
      dropzoneLimits: "Up to 30 PDF files • Max 50 MB total",
      storageUsed: "Storage used",
      filesCount: "Files uploaded",
      removeFile: "Remove file",
      duplicateBadge: "DUPLICATE",
      duplicateWarning: "Duplicate binary content detected with another file",
      duplicateMatchBlocked: "Cannot match duplicate file while another duplicate is already matched to a requirement",
      readyToGenerate: "Ready to assemble package",
      packagePreview: "Package Structure Preview",
      generateBtn: "Generate Package",
      generating: "Assembling Final PDF...",
      downloadBtn: "Download Package",
      exportChecklistCsv: "Export Checklist (CSV)",
      packageOptions: "Package Assembly Settings",
      includeIndexPage: "Include Table of Contents / Index Page",
      sealSignatureTool: "Digital Seal & Signature Stamp (PNG)",
      uploadSeal: "Stamp Seal / Signature (PNG)",
      removeSeal: "Remove Seal",
      sealPlacement: "Stamp Placement",
      posBottomRight: "Cover: Bottom-Right",
      posBottomLeft: "Cover: Bottom-Left",
      posLastPage: "Last Page: Bottom-Right",
      previewModalTitle: "Tender Package Structure Preview",
      close: "Close",
      totalPages: "Total Pages",
      startingPage: "Starting Page",
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
      step1: "রিকোয়ারমেন্ট",
      step2: "পিডিএফ আপলোড",
      step3: "নথি মিলকরণ",
      step4: "সমস্যা সমাধান",
      step5: "প্যাকেজ তৈরি ও ডাউনলোড",
      tenderOverview: "টেন্ডারের বিবরণ",
      tenderId: "টেন্ডার আইডি",
      procuringEntity: "সংগ্রহকারী সংস্থা",
      bidder: "দরপত্রদাতা",
      submissionDeadline: "জমা দেওয়ার শেষ তারিখ",
      loadRequirementsBtn: "requirements.json লোড করুন",
      sampleTenders: "নমুনা টেন্ডার লোড করুন",
      exportProject: "প্রজেক্ট সংরক্ষণ",
      reopenProject: "প্রজেক্ট খুলুন",
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
      status_ok: "ঠিক আছে (OK)",
      status_missing: "অনুপস্থিত (Missing)",
      status_expiry_needed: "মেয়াদ তারিখ প্রয়োজন",
      status_expired: "মেয়াদোত্তীর্ণ (Expired)",
      status_not_provided: "প্রদান করা হয়নি",
      reason_ok: "নথি মেলানো হয়েছে এবং জমার জন্য প্রস্তুত",
      reason_missing: "বাধ্যতামূলক নথিটির সাথে কোনো পিডিএফ মেলানো হয়নি",
      reason_expiry_needed: "এই নথির মেয়াদ উত্তীর্ণের তারিখ প্রদান করতে হবে",
      reason_expired: "নথির মেয়াদ টেন্ডার জমার তারিখের আগেই শেষ হয়ে গেছে",
      reason_not_provided: "ঐচ্ছিক নথি প্রদান করা হয়নি (বাধ্যতামূলক নয়)",
      allReadyTitle: "প্যাকেজ তৈরির জন্য প্রস্তুত",
      allReadyDesc: "সকল আবশ্যক নথি সফলভাবে যাচাই করা হয়েছে। আপনি এখন চূড়ান্ত টেন্ডার প্যাকেজ তৈরি করতে পারেন।",
      blockingTitle: "প্যাকেজ এখনো তৈরি করা সম্ভব নয়",
      blockingDesc: "প্যাকেজ তৈরির পূর্বে নিচের সমস্যাগুলো সমাধান করতে হবে:",
      checklistTitle: "প্রয়োজনীয় নথির তালিকা",
      mandatoryBadge: "বাধ্যতামূলক",
      optionalBadge: "ঐচ্ছিক",
      expiryBadge: "মেয়াদ আবশ্যক",
      matchedFile: "সংযুক্ত পিডিএফ",
      noFileMatched: "কোনো ফাইল নির্বাচিত নেই",
      selectFilePlaceholder: "-- আপলোডকৃত পিডিএফ নির্বাচন করুন --",
      unmatchBtn: "সংযোগ বিচ্ছিন্ন",
      expiryDateLabel: "মেয়াদ শেষ:",
      autoMatchBtn: "স্বয়ংক্রিয় ম্যাচ পরামর্শ",
      autoMatchModalTitle: "স্বয়ংক্রিয় ম্যাচের পরামর্শ",
      autoMatchApply: "পরামর্শ প্রয়োগ করুন",
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
      readyToGenerate: "প্যাকেজ তৈরির জন্য প্রস্তুত",
      packagePreview: "প্যাকেজ কাঠামোর প্রিভিউ",
      generateBtn: "প্যাকেজ তৈরি করুন",
      generating: "চূড়ান্ত পিডিএফ সংযোজিত হচ্ছে...",
      downloadBtn: "প্যাকেজ ডাউনলোড করুন",
      exportChecklistCsv: "চেকলিস্ট এক্সপোর্ট (CSV)",
      packageOptions: "প্যাকেজ অ্যাসেম্বলি সেটিংস",
      includeIndexPage: "সূচিপত্র / ইনডেক্স পেজ যুক্ত করুন",
      sealSignatureTool: "ডিজিটাল সিল ও স্বাক্ষর (PNG)",
      uploadSeal: "PNG সিল/স্বাক্ষর আপলোড",
      removeSeal: "সিল মুছুন",
      sealPlacement: "সিলের অবস্থান",
      posBottomRight: "কভার পেজ - নিচে ডানে",
      posBottomLeft: "কভার পেজ - নিচে বামে",
      posLastPage: "শেষ পেজ - নিচে ডানে",
      previewModalTitle: "টেন্ডার প্যাকেজ প্রিভিউ ও পরিদর্শন",
      close: "বন্ধ করুন",
      totalPages: "মোট পৃষ্ঠা",
      startingPage: "শুরুর পৃষ্ঠা",
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

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (translations[lang]) {
      currentLang = lang;
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('data-lang', lang);
    }
  }

  function t(key, fallback = '') {
    const dict = translations[currentLang] || translations.en;
    return dict[key] || translations.en[key] || fallback || key;
  }

  /* ==========================================================================
     2. Central State Management Store
     ========================================================================== */

  class Store {
    constructor() {
      this.state = {
        tender: null,       // Dynamic tender details
        requirements: [],   // Array of { id, order, title_en, title_bn, mandatory, has_expiry }
        uploadedFiles: [],  // Array of { id, file, filename, size, pageCount, contentHash, ... }
        matches: {},        // requirementId -> fileId
        expiries: {},       // requirementId -> YYYY-MM-DD
        activeFilter: 'all',
        isGenerating: false,
        options: {
          includeIndexPage: true,
          signatureDataUrl: null,
          signaturePlacement: 'cover-bottom-right',
          signatureScale: 1.0
        }
      };
      this.listeners = new Set();
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }

    notify() {
      for (const listener of this.listeners) {
        try {
          listener(this.state);
        } catch (e) {
          console.error("Store notification error:", e);
        }
      }
    }

    setTender(tenderData) {
      this.state.tender = tenderData ? { ...tenderData } : null;
      this.notify();
    }

    setRequirements(requirements) {
      const sorted = Array.isArray(requirements)
        ? [...requirements].sort((a, b) => Number(a.order) - Number(b.order))
        : [];
      this.state.requirements = sorted;
      this.notify();
    }

    loadTenderSpecification(tenderData, requirements) {
      this.state.tender = tenderData ? { ...tenderData } : null;
      this.state.requirements = Array.isArray(requirements)
        ? [...requirements].sort((a, b) => Number(a.order) - Number(b.order))
        : [];
      this.state.matches = {};
      this.state.expiries = {};
      this.state.activeFilter = 'all';
      this.notify();
    }

    addUploadedFiles(filesArray) {
      this.state.uploadedFiles = [...this.state.uploadedFiles, ...filesArray];
      this.notify();
    }

    updateFile(fileId, updates) {
      const idx = this.state.uploadedFiles.findIndex(f => f.id === fileId);
      if (idx !== -1) {
        this.state.uploadedFiles[idx] = { ...this.state.uploadedFiles[idx], ...updates };
        this.notify();
      }
    }

    removeFile(fileId) {
      for (const reqId in this.state.matches) {
        if (this.state.matches[reqId] === fileId) {
          delete this.state.matches[reqId];
        }
      }
      this.state.uploadedFiles = this.state.uploadedFiles.filter(f => f.id !== fileId);
      this.notify();
    }

    clearFiles() {
      this.state.uploadedFiles = [];
      this.state.matches = {};
      this.notify();
    }

    setMatch(requirementId, fileId) {
      if (!fileId) {
        delete this.state.matches[requirementId];
      } else {
        // Enforce 1-to-1
        for (const rId in this.state.matches) {
          if (this.state.matches[rId] === fileId) {
            delete this.state.matches[rId];
          }
        }
        this.state.matches[requirementId] = fileId;
      }
      this.notify();
    }

    unmatch(requirementId) {
      if (this.state.matches[requirementId]) {
        delete this.state.matches[requirementId];
        this.notify();
      }
    }

    setExpiryDate(requirementId, dateString) {
      if (dateString) {
        this.state.expiries[requirementId] = dateString.trim();
      } else {
        delete this.state.expiries[requirementId];
      }
      this.notify();
    }

    setActiveFilter(filterName) {
      this.state.activeFilter = filterName;
      this.notify();
    }

    setOptions(newOptions) {
      this.state.options = { ...this.state.options, ...newOptions };
      this.notify();
    }

    resetAll() {
      this.state.tender = null;
      this.state.requirements = [];
      this.state.uploadedFiles = [];
      this.state.matches = {};
      this.state.expiries = {};
      this.state.activeFilter = 'all';
      this.notify();
    }
  }

  const store = new Store();

  /* ==========================================================================
     3. Document Status Engine & Compliance Logic
     ========================================================================== */

  const STATUS_TYPES = {
    MISSING: 'missing',
    EXPIRY_NEEDED: 'expiry_needed',
    EXPIRED: 'expired',
    NOT_PROVIDED: 'not_provided',
    OK: 'ok'
  };

  function normalizeDate(dateStr) {
    if (!dateStr) return null;
    const match = String(dateStr).trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : String(dateStr).trim();
  }

  function computeRequirementStatus(req, matchedFile, expiryDate, submissionDeadline) {
    const isMandatory = Boolean(req.mandatory);
    const hasExpiry = Boolean(req.has_expiry);
    const hasFile = Boolean(matchedFile);

    if (!hasFile) {
      if (isMandatory) {
        return {
          status: STATUS_TYPES.MISSING,
          isBlocking: true,
          reasonKey: 'reason_missing'
        };
      } else {
        return {
          status: STATUS_TYPES.NOT_PROVIDED,
          isBlocking: false,
          reasonKey: 'reason_not_provided'
        };
      }
    }

    if (hasExpiry) {
      const cleanExpiry = normalizeDate(expiryDate);
      const cleanDeadline = normalizeDate(submissionDeadline);

      if (!cleanExpiry) {
        return {
          status: STATUS_TYPES.EXPIRY_NEEDED,
          isBlocking: true,
          reasonKey: 'reason_expiry_needed'
        };
      }

      if (cleanExpiry < cleanDeadline) {
        return {
          status: STATUS_TYPES.EXPIRED,
          isBlocking: true,
          reasonKey: 'reason_expired',
          reasonParams: { expiry: cleanExpiry, deadline: cleanDeadline }
        };
      }

      // If cleanExpiry >= cleanDeadline, status is strictly OK
      return {
        status: STATUS_TYPES.OK,
        isBlocking: false,
        reasonKey: 'reason_ok'
      };
    }

    return {
      status: STATUS_TYPES.OK,
      isBlocking: false,
      reasonKey: 'reason_ok'
    };
  }

  function evaluateCompliance(state) {
    const { tender, requirements = [], uploadedFiles = [], matches = {}, expiries = {} } = state;
    const deadline = tender?.submission_deadline || '';

    const fileMap = new Map();
    for (const f of uploadedFiles) fileMap.set(f.id, f);

    const statusMap = new Map();
    const blockingIssues = [];
    const metrics = {
      total: requirements.length,
      ok: 0,
      missing: 0,
      expiry_needed: 0,
      expired: 0,
      not_provided: 0,
      duplicates: 0,
      blockingCount: 0
    };

    // Group files by contentHash for duplicate detection
    const hashGroups = new Map();
    for (const f of uploadedFiles) {
      if (f.contentHash) {
        if (!hashGroups.has(f.contentHash)) hashGroups.set(f.contentHash, []);
        hashGroups.get(f.contentHash).push(f);
      }
    }

    let duplicateFilesCount = 0;
    for (const [, group] of hashGroups.entries()) {
      if (group.length > 1) duplicateFilesCount += group.length;
    }
    metrics.duplicates = duplicateFilesCount;

    // Track matched hashes to block two duplicate files from fulfilling two requirements
    const matchedHashes = new Map();

    for (const req of requirements) {
      const fileId = matches[req.id];
      const matchedFile = fileId ? fileMap.get(fileId) : null;
      const expiryDate = expiries[req.id] || null;

      const evaluation = computeRequirementStatus(req, matchedFile, expiryDate, deadline);

      let duplicateMatchConflict = null;
      if (matchedFile && matchedFile.contentHash) {
        const existingReqId = matchedHashes.get(matchedFile.contentHash);
        if (existingReqId && existingReqId !== req.id) {
          duplicateMatchConflict = {
            conflictReqId: existingReqId,
            hash: matchedFile.contentHash
          };
        } else {
          matchedHashes.set(matchedFile.contentHash, req.id);
        }
      }

      if (duplicateMatchConflict) {
        evaluation.duplicateConflict = duplicateMatchConflict;
        evaluation.isBlocking = true;
      }

      statusMap.set(req.id, {
        ...evaluation,
        matchedFile,
        expiryDate,
        req
      });

      switch (evaluation.status) {
        case STATUS_TYPES.OK: metrics.ok++; break;
        case STATUS_TYPES.MISSING: metrics.missing++; break;
        case STATUS_TYPES.EXPIRY_NEEDED: metrics.expiry_needed++; break;
        case STATUS_TYPES.EXPIRED: metrics.expired++; break;
        case STATUS_TYPES.NOT_PROVIDED: metrics.not_provided++; break;
      }

      if (evaluation.isBlocking) {
        blockingIssues.push({
          reqId: req.id,
          order: req.order,
          title_en: req.title_en,
          title_bn: req.title_bn,
          status: evaluation.status,
          reasonKey: evaluation.reasonKey,
          reasonParams: evaluation.reasonParams,
          duplicateConflict: evaluation.duplicateConflict
        });
      }
    }

    metrics.blockingCount = blockingIssues.length;

    return {
      statusMap,
      metrics,
      blockingIssues,
      canGenerate: blockingIssues.length === 0 && requirements.length > 0 && Boolean(tender)
    };
  }

  /* ==========================================================================
     4. Matcher & Auto-Match Suggestion Engine
     ========================================================================== */

  function cleanText(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/\.pdf$/i, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function calculateMatchScore(filename, requirement) {
    const cleanFile = cleanText(filename);
    const fileTokens = cleanFile.split(' ').filter(t => t.length > 1);
    const cleanEn = cleanText(requirement.title_en);
    const enTokens = cleanEn.split(' ').filter(t => t.length > 1);

    let score = 0;
    if (cleanFile.includes(cleanEn) || cleanEn.includes(cleanFile)) score += 0.8;
    if (cleanFile.includes(cleanText(requirement.id))) score += 0.5;

    let matchedTokens = 0;
    for (const token of fileTokens) {
      if (enTokens.includes(token) || cleanEn.includes(token)) matchedTokens++;
    }

    if (fileTokens.length > 0) {
      score += (matchedTokens / Math.max(fileTokens.length, enTokens.length)) * 0.7;
    }
    return Math.min(score, 1.0);
  }

  function generateAutoMatchSuggestions(requirements = [], uploadedFiles = [], currentMatches = {}) {
    const suggestions = [];
    const usedFileIds = new Set(Object.values(currentMatches));
    const fileMap = new Map(uploadedFiles.map(f => [f.id, f]));
    const usedHashes = new Set();
    for (const fId of usedFileIds) {
      const f = fileMap.get(fId);
      if (f && f.contentHash) usedHashes.add(f.contentHash);
    }

    const availableFiles = uploadedFiles.filter(f => {
      if (f.processingError) return false;
      if (usedFileIds.has(f.id)) return false;
      if (f.contentHash && usedHashes.has(f.contentHash)) return false;
      return true;
    });

    const unmatchedReqs = requirements.filter(r => !currentMatches[r.id]);
    const assignedFiles = new Set();

    for (const req of unmatchedReqs) {
      let bestMatch = null;
      let highestScore = 0.35;

      for (const file of availableFiles) {
        if (assignedFiles.has(file.id)) continue;
        const score = calculateMatchScore(file.filename, req);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = file;
        }
      }

      if (bestMatch) {
        assignedFiles.add(bestMatch.id);
        suggestions.push({
          requirementId: req.id,
          requirementTitle: req.title_en,
          requirementTitleBn: req.title_bn,
          requirementOrder: req.order,
          fileId: bestMatch.id,
          filename: bestMatch.filename,
          score: Math.round(highestScore * 100)
        });
      }
    }
    return suggestions;
  }

  function checkDuplicateConflict(file, targetReqId, state) {
    if (!file || !file.contentHash) return null;
    const { matches = {}, uploadedFiles = [], requirements = [] } = state;
    const fileMap = new Map(uploadedFiles.map(f => [f.id, f]));
    const reqMap = new Map(requirements.map(r => [r.id, r]));

    for (const [reqId, matchedFileId] of Object.entries(matches)) {
      if (reqId === targetReqId) continue;
      const existingFile = fileMap.get(matchedFileId);
      if (existingFile && existingFile.contentHash === file.contentHash) {
        const conflictReq = reqMap.get(reqId);
        return {
          conflictingReqId: reqId,
          conflictingOrder: conflictReq?.order || reqId,
          conflictingReqTitle: conflictReq?.title_en || reqId,
          conflictingFileName: existingFile.filename
        };
      }
    }
    return null;
  }

  /* ==========================================================================
     5. PDF Processing Engine (pdf-lib & Web Crypto)
     ========================================================================== */

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

  async function calculateSha256(arrayBuffer) {
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

  function sanitizePdfText(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/[\u2013\u2014\u2212]/g, '-')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2022\u2023\u25E6]/g, '*')
      .replace(/[\u2026]/g, '...')
      .replace(/[^\x00-\xFF]/g, ' ')
      .trim();
  }

  async function inspectPdfFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hash = await calculateSha256(arrayBuffer);

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

    return { arrayBuffer, pageCount, hash };
  }

  async function assembleTenderPackage({
    tender,
    orderedRequirements,
    statusMap,
    includeIndexPage = true,
    signatureConfig = null,
    onProgress = () => {}
  }) {
    if (!window.PDFLib) throw new Error("PDF engine not initialized.");
    const { PDFDocument, rgb, StandardFonts } = window.PDFLib;

    onProgress("Initializing package document...", 5);
    const packageDoc = await PDFDocument.create();

    const fontRegular = await packageDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await packageDoc.embedFont(StandardFonts.HelveticaBold);
    const fontOblique = await packageDoc.embedFont(StandardFonts.HelveticaOblique);

    const primaryColor = rgb(0.12, 0.23, 0.54);   // Deep Navy (#1e3a8a)
    const secondaryColor = rgb(0.01, 0.52, 0.78); // Blue (#0284c7)
    const textColor = rgb(0.1, 0.1, 0.1);
    const textMuted = rgb(0.4, 0.45, 0.5);
    const borderColor = rgb(0.85, 0.88, 0.92);
    const rowBgAlt = rgb(0.97, 0.98, 0.99);

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

    // --- 1. OFFICIAL COVER PAGE (English) ---
    onProgress("Preparing official cover page...", 15);
    const coverPage = packageDoc.addPage([595.28, 841.89]);
    const { width: cWidth, height: cHeight } = coverPage.getSize();

    coverPage.drawRectangle({
      x: 0,
      y: cHeight - 16,
      width: cWidth,
      height: 16,
      color: primaryColor
    });

    coverPage.drawRectangle({
      x: 36,
      y: 36,
      width: cWidth - 72,
      height: cHeight - 72,
      borderColor: borderColor,
      borderWidth: 1.5
    });

    let curY = cHeight - 65;

    coverPage.drawText("OFFICIAL TENDER SUBMISSION PACKAGE", {
      x: 54,
      y: curY,
      size: 13,
      font: fontBold,
      color: secondaryColor
    });

    curY -= 28;
    const safeTenderId = sanitizePdfText(tender?.tender_id || 'N/A');
    coverPage.drawText(`TENDER REF: ${safeTenderId}`, {
      x: 54,
      y: curY,
      size: 20,
      font: fontBold,
      color: primaryColor
    });

    curY -= 14;
    coverPage.drawLine({
      start: { x: 54, y: curY },
      end: { x: cWidth - 54, y: curY },
      thickness: 2,
      color: secondaryColor
    });

    curY -= 26;
    coverPage.drawText("PROJECT / TENDER TITLE:", {
      x: 54,
      y: curY,
      size: 8.5,
      font: fontBold,
      color: textMuted
    });

    curY -= 18;
    const safeTitle = sanitizePdfText(tender?.title || 'Untitled Tender');
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

    const gridStartY = curY;
    const col1X = 54;
    const col2X = 310;

    coverPage.drawText("PROCURING ENTITY:", { x: col1X, y: gridStartY, size: 8, font: fontBold, color: textMuted });
    coverPage.drawText(sanitizePdfText(tender?.procuring_entity || 'N/A'), { x: col1X, y: gridStartY - 15, size: 11, font: fontRegular, color: textColor });

    coverPage.drawText("BIDDER / TENDERER:", { x: col2X, y: gridStartY, size: 8, font: fontBold, color: textMuted });
    coverPage.drawText(sanitizePdfText(tender?.bidder || 'N/A'), { x: col2X, y: gridStartY - 15, size: 11, font: fontBold, color: primaryColor });

    coverPage.drawText("SUBMISSION DEADLINE:", { x: col1X, y: gridStartY - 40, size: 8, font: fontBold, color: textMuted });
    coverPage.drawText(sanitizePdfText(tender?.submission_deadline || 'N/A'), { x: col1X, y: gridStartY - 55, size: 11, font: fontBold, color: rgb(0.8, 0.2, 0.2) });

    const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    coverPage.drawText("PACKAGE ASSEMBLED ON:", { x: col2X, y: gridStartY - 40, size: 8, font: fontBold, color: textMuted });
    coverPage.drawText(nowFormatted, { x: col2X, y: gridStartY - 55, size: 10, font: fontRegular, color: textColor });

    curY = gridStartY - 80;

    coverPage.drawText("SCHEDULE OF ENCLOSED DOCUMENTS (IN SUBMISSION ORDER):", {
      x: 54,
      y: curY,
      size: 9,
      font: fontBold,
      color: primaryColor
    });

    curY -= 14;

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

    let rowIdx = 0;
    for (const item of includedDocs) {
      if (curY < 120) {
        coverPage.drawText(`... and ${includedDocs.length - rowIdx} additional document(s) (see Table of Contents)`, {
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
      const titleText = sanitizePdfText(item.req.title_en).substring(0, 32);
      const fileNameText = sanitizePdfText(item.file.filename).substring(0, 26);
      const pageText = String(item.file.pageCount || 1);
      const expiryText = sanitizePdfText(item.expiryDate);

      coverPage.drawText(orderNum, { x: 60, y: curY, size: 8, font: fontBold, color: textColor });
      coverPage.drawText(titleText, { x: 80, y: curY, size: 8, font: fontRegular, color: textColor });
      coverPage.drawText(fileNameText, { x: 260, y: curY, size: 7.5, font: fontRegular, color: textMuted });
      coverPage.drawText(pageText, { x: 430, y: curY, size: 8, font: fontRegular, color: textColor });
      coverPage.drawText(expiryText, { x: 480, y: curY, size: 8, font: fontRegular, color: textColor });

      curY -= 16;
      rowIdx++;
    }

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

    // --- 2. TABLE OF CONTENTS / INDEX PAGE (Page 2) ---
    const startingPageMap = new Map();
    let runningPageNumber = 1 + (includeIndexPage ? 1 : 0);

    for (const item of includedDocs) {
      startingPageMap.set(item.req.id, runningPageNumber + 1);
      runningPageNumber += (item.file.pageCount || 1);
    }

    if (includeIndexPage) {
      onProgress("Generating Table of Contents / Index...", 30);
      const indexPage = packageDoc.addPage([595.28, 841.89]);
      const { width: iWidth, height: iHeight } = indexPage.getSize();

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

      let idxNum = 0;
      for (const item of includedDocs) {
        if (iY < 60) break;

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
        indexPage.drawText(sanitizePdfText(item.req.title_en).substring(0, 32), { x: 105, y: iY, size: 8.5, font: fontRegular, color: textColor });
        indexPage.drawText(sanitizePdfText(item.file.filename).substring(0, 24), { x: 290, y: iY, size: 8, font: fontRegular, color: textMuted });
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
      const progressPercent = 35 + Math.round((docCount / includedDocs.length) * 45);
      onProgress(`Combining document ${docCount}/${includedDocs.length}: ${sanitizePdfText(item.file.filename)}...`, progressPercent);

      try {
        const srcDoc = await PDFDocument.load(item.file.arrayBuffer, { ignoreEncryption: true });
        const pageIndices = srcDoc.getPageIndices();
        const copiedPages = await packageDoc.copyPages(srcDoc, pageIndices);

        for (const page of copiedPages) {
          packageDoc.addPage(page);
        }
      } catch (err) {
        console.error(`Error copying pages from ${item.file.filename}:`, err);
        throw new Error(`Failed to merge document "${item.file.filename}". File may be corrupted or protected.`);
      }
    }

    // --- 4. SIGNATURE / SEAL PNG EMBEDDING ---
    if (signatureConfig && signatureConfig.dataUrl) {
      try {
        onProgress("Applying digital seal and signature stamp...", 85);
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

        if (targetPlacement === 'cover-bottom-left') stampX = 55;

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
    onProgress("Applying dynamic pagination footers...", 90);
    const totalFinalPages = packageDoc.getPageCount();
    const pages = packageDoc.getPages();

    for (let idx = 0; idx < totalFinalPages; idx++) {
      const page = pages[idx];
      const { width: pWidth } = page.getSize();
      const pageNumber = idx + 1;
      const footerText = `${safeTenderId} | Page ${pageNumber} of ${totalFinalPages}`;

      const textWidth = fontRegular.widthOfTextAtSize(footerText, 8);
      const footerX = (pWidth - textWidth) / 2;
      const footerY = 16;

      page.drawRectangle({
        x: 36,
        y: footerY - 4,
        width: pWidth - 72,
        height: 18,
        color: rgb(1, 1, 1),
        opacity: 0.92
      });

      page.drawLine({
        start: { x: 36, y: footerY + 14 },
        end: { x: pWidth - 36, y: footerY + 14 },
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

    onProgress("Finalizing package...", 98);
    const pdfBytes = await packageDoc.save();
    onProgress("Package generated successfully.", 100);

    return pdfBytes;
  }

  function downloadPackagePdf(pdfBytes, tenderId) {
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

    setTimeout(() => URL.revokeObjectURL(downloadUrl), 30000);
    return filename;
  }

  /* ==========================================================================
     6. Sample Data Presets & In-Browser PDF Generator
     ========================================================================== */

  const SAMPLE_TENDERS = {
    standard_ict: {
      tender: {
        tender_id: "T-2026-0417",
        title: "Procurement of High-Performance IT Infrastructure & Datacenter Equipment",
        procuring_entity: "Department of Digital Transformation",
        bidder: "Apex Technologies & Solutions Ltd.",
        submission_deadline: "2026-11-30"
      },
      requirements: [
        { id: "req-1", order: 1, title_en: "Trade License", title_bn: "ট্রেড লাইসেন্স", mandatory: true, has_expiry: true },
        { id: "req-2", order: 2, title_en: "TIN Certificate", title_bn: "টিআইএন সার্টিফিকেট", mandatory: true, has_expiry: false },
        { id: "req-3", order: 3, title_en: "VAT Registration Certificate", title_bn: "ভ্যাট নিবন্ধন সনদ", mandatory: true, has_expiry: false },
        { id: "req-4", order: 4, title_en: "Bank Solvency Certificate", title_bn: "ব্যাংক সচ্ছলতা সনদ", mandatory: true, has_expiry: true },
        { id: "req-5", order: 5, title_en: "Manufacturer Authorization Form (MAF)", title_bn: "প্রস্তুতকারকের অনুমোদন পত্র (এমএএফ)", mandatory: true, has_expiry: false },
        { id: "req-6", order: 6, title_en: "ISO 9001:2015 Quality Certificate", title_bn: "আইএসও ৯০০১ গুণমান সনদ", mandatory: false, has_expiry: true },
        { id: "req-7", order: 7, title_en: "Past Experience Completion Certificates", title_bn: "পূর্ববর্তী অভিজ্ঞতা সমাপ্তির সনদ", mandatory: true, has_expiry: false },
        { id: "req-8", order: 8, title_en: "Litigation History Affidavit", title_bn: "মামলা সংক্রান্ত হলফনামা", mandatory: false, has_expiry: false }
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

  function downloadSampleRequirementsJson(presetKey = 'standard_ict') {
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

  async function generateSamplePdfDoc(title, numPages, issuer) {
    const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
    const doc = await PDFDocument.create();
    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontReg = await doc.embedFont(StandardFonts.Helvetica);

    for (let i = 1; i <= numPages; i++) {
      const page = doc.addPage([595.28, 841.89]);
      const { width, height } = page.getSize();

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

  async function generateDemoPdfFiles() {
    if (!window.PDFLib) {
      throw new Error("PDFLib library is still loading. Please try again in a moment.");
    }

    const files = [];

    // 1. Trade License (2 pages)
    const tradeBytes = await generateSamplePdfDoc("TRADE LICENSE CERTIFICATE", 2, "City Corporation Licensing Authority");
    files.push(new File([tradeBytes], "Trade_License_2026.pdf", { type: "application/pdf" }));

    // 2. Exact Binary Duplicate with different name (Tests real duplicate detection)
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

  /* ==========================================================================
     7. UI Renderers & Toast Notifications
     ========================================================================== */

  let lastGeneratedBlobUrl = null;
  let lastGeneratedBytes = null;
  let lastGeneratedFilename = null;

  function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-message">${message}</div>
      <button class="btn btn-icon-only btn-sm" style="margin-left:auto;" aria-label="Close">&times;</button>
    `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function renderHeader() {
    const lang = getLang();
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function renderStepper(compliance) {
    const state = store.getState();
    const hasReqs = state.tender && state.requirements.length > 0;
    const hasFiles = state.uploadedFiles.length > 0;
    const hasMatches = Object.keys(state.matches).length > 0;
    const isReady = compliance.canGenerate;

    const s1 = document.getElementById('step-1');
    const s2 = document.getElementById('step-2');
    const s3 = document.getElementById('step-3');
    const s4 = document.getElementById('step-4');
    const s5 = document.getElementById('step-5');

    if (s1) s1.className = `step-item ${hasReqs ? 'completed' : 'active'}`;
    if (s2) s2.className = `step-item ${hasFiles ? 'completed' : (hasReqs ? 'active' : '')}`;
    if (s3) s3.className = `step-item ${hasMatches ? 'completed' : (hasFiles ? 'active' : '')}`;
    if (s4) s4.className = `step-item ${isReady ? 'completed' : (hasMatches ? 'active' : '')}`;
    if (s5) s5.className = `step-item ${isReady ? 'active' : ''}`;
  }

  function renderTenderOverview() {
    const state = store.getState();
    const tender = state.tender;
    const card = document.querySelector('.tender-hero-card');
    if (!card) return;

    if (!tender) {
      card.innerHTML = `
        <div style="padding:1.5rem; text-align:center; display:flex; flex-direction:column; align-items:center; gap:0.75rem;">
          <div style="width:48px; height:48px; border-radius:50%; background:var(--color-primary-light); color:var(--color-primary); display:flex; align-items:center; justify-content:center;">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h2 style="font-size:1.25rem; font-weight:700; color:var(--color-text-main);">Start by loading the tender requirements.</h2>
          <p style="font-size:0.85rem; color:var(--color-text-muted); max-width:540px;">
            Import an official <code>requirements.json</code> specification, or load a demonstration preset to explore the workflow.
          </p>
          <div style="display:flex; gap:0.75rem; margin-top:0.5rem; flex-wrap:wrap; justify-content:center;">
            <button type="button" class="btn btn-primary" id="btn-hero-load-req">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              <span>Import requirements.json</span>
            </button>
            <button type="button" class="btn btn-secondary" id="btn-hero-load-preset">
              <span>⚡ Load Demo IT Tender</span>
            </button>
          </div>
        </div>
      `;

      const btnReq = document.getElementById('btn-hero-load-req');
      const inputReq = document.getElementById('req-file-input');
      if (btnReq && inputReq) btnReq.onclick = () => inputReq.click();

      const btnPreset = document.getElementById('btn-hero-load-preset');
      if (btnPreset) btnPreset.onclick = () => loadPresetTender('standard_ict');
      return;
    }

    card.innerHTML = `
      <div class="hero-header">
        <div class="hero-main-info">
          <div class="tender-id-tag">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <span id="tender-id-display">${tender.tender_id || 'N/A'}</span>
          </div>
          <h2 class="tender-title-text" id="tender-title-display">${tender.title || 'Untitled Tender'}</h2>
        </div>

        <div class="hero-actions">
          <button type="button" class="btn btn-outline-primary btn-sm" id="btn-change-requirements">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            <span>Change requirements.json</span>
          </button>

          <select class="custom-select" id="preset-tender-select" style="font-size:0.8rem; padding:0.35rem 0.6rem;">
            <option value="">Load Preset Tender...</option>
            <option value="standard_ict">Standard ICT & Workstations</option>
            <option value="medical_supplies">Medical Equipment Tender</option>
          </select>

          <button type="button" class="btn btn-secondary btn-sm" id="btn-save-project" title="Export Project State">
            <span>Save Project</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-open-project" title="Open Saved Project">
            <span>Open Project</span>
          </button>
        </div>
      </div>

      <div class="tender-meta-grid">
        <div class="meta-item">
          <span class="meta-label">Procuring Entity</span>
          <span class="meta-value">${tender.procuring_entity || '—'}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Bidder / Contractor</span>
          <span class="meta-value">${tender.bidder || '—'}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Submission Deadline</span>
          <span class="meta-value deadline-highlight">${tender.submission_deadline || '—'}</span>
        </div>
      </div>
    `;

    const btnChange = document.getElementById('btn-change-requirements');
    const inputReq = document.getElementById('req-file-input');
    if (btnChange && inputReq) btnChange.onclick = () => inputReq.click();

    const presetSelect = document.getElementById('preset-tender-select');
    if (presetSelect) {
      presetSelect.onchange = (e) => {
        if (e.target.value) {
          loadPresetTender(e.target.value);
          e.target.value = '';
        }
      };
    }

    const btnSave = document.getElementById('btn-save-project');
    if (btnSave) btnSave.onclick = handleSaveProject;

    const btnOpen = document.getElementById('btn-open-project');
    const projectInput = document.getElementById('project-file-input');
    if (btnOpen && projectInput) btnOpen.onclick = () => projectInput.click();
  }

  function renderMetrics(compliance) {
    const { metrics } = compliance;
    const activeFilter = store.getState().activeFilter;

    const countOk = document.getElementById('metric-count-ok');
    const countMissing = document.getElementById('metric-count-missing');
    const countExpiry = document.getElementById('metric-count-expiry');
    const countExpired = document.getElementById('metric-count-expired');
    const countOptional = document.getElementById('metric-count-optional');
    const countDuplicate = document.getElementById('metric-count-duplicate');
    const countBlocking = document.getElementById('metric-count-blocking');

    if (countOk) countOk.textContent = `${metrics.ok} / ${metrics.total}`;
    if (countMissing) countMissing.textContent = metrics.missing;
    if (countExpiry) countExpiry.textContent = metrics.expiry_needed;
    if (countExpired) countExpired.textContent = metrics.expired;
    if (countOptional) countOptional.textContent = metrics.not_provided;
    if (countDuplicate) countDuplicate.textContent = metrics.duplicates;
    if (countBlocking) countBlocking.textContent = metrics.blockingCount;

    document.querySelectorAll('.metric-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === activeFilter);
    });

    const clearHint = document.getElementById('filter-clear-hint');
    if (clearHint) {
      clearHint.style.display = (activeFilter !== 'all') ? 'flex' : 'none';
    }
  }

  function renderBlockingBanner(compliance) {
    const banner = document.getElementById('blocking-alert-banner');
    if (!banner) return;

    const state = store.getState();
    if (!state.tender) {
      banner.style.display = 'none';
      return;
    }
    banner.style.display = 'flex';

    const { blockingIssues, canGenerate } = compliance;
    const lang = getLang();

    if (canGenerate) {
      banner.className = 'blocking-alert-card ready-state';
      banner.innerHTML = `
        <div class="alert-icon-box">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="alert-content-box">
          <div class="alert-headline">${t('allReadyTitle')} (PACKAGE READY)</div>
          <div class="alert-subtext">${t('allReadyDesc')}</div>
        </div>
        <button type="button" class="btn btn-primary btn-sm btn-pulse" id="btn-quick-generate-jump">
          <span>Proceed to Generate</span>
        </button>
      `;

      const jumpBtn = document.getElementById('btn-quick-generate-jump');
      if (jumpBtn) {
        jumpBtn.onclick = () => {
          document.querySelector('.action-generation-bar')?.scrollIntoView({ behavior: 'smooth' });
        };
      }
    } else {
      banner.className = 'blocking-alert-card has-blocking';

      let issuesRowsHtml = '';
      for (const issue of blockingIssues) {
        const title = (lang === 'bn' && issue.title_bn) ? issue.title_bn : issue.title_en;
        let reasonText = '';
        let actionLabel = '';
        let actionType = '';

        if (issue.duplicateConflict) {
          reasonText = `Duplicate file binary content used across multiple requirements (#${issue.duplicateConflict.conflictingReqId || 'Conflict'}).`;
          actionLabel = 'Fix Duplicate';
          actionType = 'file';
        } else if (issue.status === STATUS_TYPES.MISSING) {
          reasonText = 'Required document has no matched PDF.';
          actionLabel = 'Match File';
          actionType = 'file';
        } else if (issue.status === STATUS_TYPES.EXPIRY_NEEDED) {
          reasonText = 'Expiry date must be specified for this requirement.';
          actionLabel = 'Enter Expiry';
          actionType = 'expiry';
        } else if (issue.status === STATUS_TYPES.EXPIRED) {
          reasonText = `Document has expired (${issue.reasonParams?.expiry} is before deadline ${issue.reasonParams?.deadline}).`;
          actionLabel = 'Update Expiry';
          actionType = 'expiry';
        }

        issuesRowsHtml += `
          <div class="blocking-issue-row" style="display:flex; align-items:center; justify-content:space-between; padding:0.4rem 0.6rem; background:#fff; border-radius:var(--radius-sm); border:1px solid var(--color-missing-border); font-size:0.8rem; gap:0.5rem; flex-wrap:wrap;">
            <div>
              <strong>#${issue.order}: ${title}</strong> — <span style="color:var(--color-missing);">${reasonText}</span>
            </div>
            <button type="button" class="btn btn-secondary btn-sm btn-jump-resolve" data-req-id="${issue.reqId}" data-action-type="${actionType}" style="padding:0.2rem 0.5rem; font-size:0.75rem;">
              ${actionLabel} →
            </button>
          </div>
        `;
      }

      banner.innerHTML = `
        <div class="alert-icon-box">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <div class="alert-content-box" style="width:100%;">
          <div class="alert-headline">${t('blockingTitle')} (PACKAGE NOT READY)</div>
          <div class="alert-subtext">${blockingIssues.length} issue(s) must be resolved before the submission package can be generated:</div>
          <div style="display:flex; flex-direction:column; gap:0.35rem; margin-top:0.5rem;">
            ${issuesRowsHtml}
          </div>
        </div>
      `;

      banner.querySelectorAll('.btn-jump-resolve').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const reqId = e.currentTarget.dataset.reqId;
          const actionType = e.currentTarget.dataset.actionType;
          const targetRow = document.getElementById(`req-row-${reqId}`);
          if (targetRow) {
            targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetRow.classList.add('highlighted');
            setTimeout(() => targetRow.classList.remove('highlighted'), 2500);

            if (actionType === 'expiry') {
              const input = targetRow.querySelector('.req-expiry-input');
              if (input) input.focus();
            } else {
              const select = targetRow.querySelector('.req-file-select');
              if (select) select.focus();
            }
          }
        });
      });
    }
  }

  function renderRequirementsList(compliance) {
    const container = document.getElementById('requirements-list-container');
    if (!container) return;

    const state = store.getState();
    const { requirements = [], uploadedFiles = [], matches = {}, expiries = {}, activeFilter } = state;
    const { statusMap } = compliance;
    const lang = getLang();

    if (!state.tender || requirements.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-title">No Requirements Loaded</div>
          <div class="empty-state-desc">Start by loading requirements.json or try a preset tender above.</div>
        </div>
      `;
      return;
    }

    const filtered = requirements.filter(req => {
      if (activeFilter === 'all') return true;
      const statusData = statusMap.get(req.id);
      if (!statusData) return true;
      if (activeFilter === 'duplicate') return Boolean(statusData.duplicateConflict);
      return statusData.status === activeFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">No matching requirements for filter "${activeFilter}"</div>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filter">${t('clearFilter')}</button>
        </div>
      `;
      const btn = document.getElementById('btn-reset-filter');
      if (btn) btn.addEventListener('click', () => store.setActiveFilter('all'));
      return;
    }

    const fileMap = new Map(uploadedFiles.map(f => [f.id, f]));
    const matchedHashesToReq = new Map();
    for (const [rId, fId] of Object.entries(matches)) {
      const f = fileMap.get(fId);
      if (f && f.contentHash) matchedHashesToReq.set(f.contentHash, rId);
    }

    let html = '';
    for (const req of filtered) {
      const statusData = statusMap.get(req.id);
      const matchedFileId = matches[req.id];
      const matchedFile = statusData ? statusData.matchedFile : null;
      const expiryDate = expiries[req.id] || '';
      const status = statusData ? statusData.status : 'missing';

      const titleMain = (lang === 'bn' && req.title_bn) ? req.title_bn : req.title_en;
      const titleSub = (lang === 'bn') ? req.title_en : (req.title_bn || '');

      const statusBadgeClass = `status-${status}`;
      let statusText = t(`status_${status}`);

      let selectOptionsHtml = `<option value="">${t('selectFilePlaceholder')}</option>`;
      for (const file of uploadedFiles) {
        if (file.processingError) continue;

        const isCurrentMatch = (file.id === matchedFileId);

        let inUseElsewhereReqId = null;
        for (const [rId, fId] of Object.entries(matches)) {
          if (fId === file.id && rId !== req.id) {
            inUseElsewhereReqId = rId;
            break;
          }
        }

        let duplicateInUseReqId = null;
        if (!isCurrentMatch && file.contentHash) {
          const dupMatchedReqId = matchedHashesToReq.get(file.contentHash);
          if (dupMatchedReqId && dupMatchedReqId !== req.id) {
            duplicateInUseReqId = dupMatchedReqId;
          }
        }

        const otherReq = inUseElsewhereReqId ? requirements.find(r => r.id === inUseElsewhereReqId) : null;
        const dupReq = duplicateInUseReqId ? requirements.find(r => r.id === duplicateInUseReqId) : null;

        let statusAnnotation = '';
        let isDisabled = false;

        if (inUseElsewhereReqId) {
          statusAnnotation = ` [In use: #${otherReq?.order || inUseElsewhereReqId}]`;
          isDisabled = true;
        } else if (duplicateInUseReqId) {
          statusAnnotation = ` [DUPLICATE - In use for #${dupReq?.order || duplicateInUseReqId}]`;
          isDisabled = true;
        }

        let dupFlag = file.isDuplicate ? ` [${t('duplicateBadge')}]` : '';

        selectOptionsHtml += `
          <option value="${file.id}" ${isCurrentMatch ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}>
            ${file.filename} (${file.pageCount} ${file.pageCount === 1 ? 'page' : 'pages'})${dupFlag}${statusAnnotation}
          </option>
        `;
      }

      html += `
        <div class="requirement-row" id="req-row-${req.id}">
          <div class="req-row-top">
            <div class="req-title-col">
              <div class="order-badge">${req.order}</div>
              <div class="req-name-details">
                <div class="req-name-main">
                  <span>${titleMain}</span>
                  <div class="req-tags-group">
                    <span class="tag-badge ${req.mandatory ? 'tag-mandatory' : 'tag-optional'}">
                      ${req.mandatory ? t('mandatoryBadge') : t('optionalBadge')}
                    </span>
                    ${req.has_expiry ? `<span class="tag-badge tag-expiry">${t('expiryBadge')}</span>` : ''}
                  </div>
                </div>
                ${titleSub ? `<div class="req-name-sub">${titleSub}</div>` : ''}
              </div>
            </div>
            <div class="status-badge ${statusBadgeClass}">
              <span>●</span>
              <span>${statusText}</span>
            </div>
          </div>

          <div class="req-row-bottom">
            <div class="matching-selector-box">
              <select class="custom-select req-file-select" data-req-id="${req.id}" aria-label="Select file for ${titleMain}">
                ${selectOptionsHtml}
              </select>
              ${matchedFile ? `
                <button type="button" class="btn btn-secondary btn-sm req-unmatch-btn" data-req-id="${req.id}">
                  ${t('unmatchBtn')}
                </button>
              ` : ''}
            </div>

            ${req.has_expiry ? `
              <div class="expiry-input-box">
                <label class="expiry-input-label" for="expiry-input-${req.id}">${t('expiryDateLabel')}</label>
                <input 
                  type="date" 
                  id="expiry-input-${req.id}"
                  class="date-input req-expiry-input ${status === STATUS_TYPES.EXPIRED || status === STATUS_TYPES.EXPIRY_NEEDED ? 'date-invalid' : ''}" 
                  data-req-id="${req.id}" 
                  value="${expiryDate}"
                />
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    container.querySelectorAll('.req-file-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const reqId = e.target.dataset.reqId;
        const fileId = e.target.value;

        if (!fileId) {
          store.unmatch(reqId);
          return;
        }

        const state = store.getState();
        const selectedFile = state.uploadedFiles.find(f => f.id === fileId);

        const dupConflict = checkDuplicateConflict(selectedFile, reqId, state);
        if (dupConflict) {
          alert(`Duplicate Match Prevented:\n\nThis file has identical binary content to "${dupConflict.conflictingFileName}", which is already assigned to Requirement #${dupConflict.conflictingOrder} (${dupConflict.conflictingReqTitle}).\n\nUnder contest integrity rules, duplicate files cannot fulfill separate requirements.`);
          e.target.value = state.matches[reqId] || '';
          return;
        }

        store.setMatch(reqId, fileId);
      });
    });

    container.querySelectorAll('.req-unmatch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.currentTarget.dataset.reqId;
        store.unmatch(reqId);
      });
    });

    container.querySelectorAll('.req-expiry-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const reqId = e.target.dataset.reqId;
        const dateVal = e.target.value;
        store.setExpiryDate(reqId, dateVal);
      });
    });
  }

  function renderFileLibrary() {
    const container = document.getElementById('uploaded-files-list');
    if (!container) return;

    const state = store.getState();
    const { uploadedFiles = [], matches = {}, requirements = [] } = state;

    const totalCount = uploadedFiles.length;
    let totalBytes = 0;
    for (const f of uploadedFiles) totalBytes += f.size || 0;

    const countDisplay = document.getElementById('lib-count-display');
    const sizeDisplay = document.getElementById('lib-size-display');
    const meterFill = document.getElementById('storage-meter-fill');

    if (countDisplay) countDisplay.textContent = `${totalCount} / 30`;
    if (sizeDisplay) sizeDisplay.textContent = `${formatFileSize(totalBytes)} / 50 MB`;

    const sizePercent = Math.min((totalBytes / (50 * 1024 * 1024)) * 100, 100);
    if (meterFill) {
      meterFill.style.width = `${sizePercent}%`;
      meterFill.className = `meter-fill ${sizePercent > 85 ? 'danger' : (sizePercent > 60 ? 'warn' : '')}`;
    }

    if (uploadedFiles.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📁</div>
          <div class="empty-state-title">No PDF Files Uploaded</div>
          <div class="empty-state-desc">Drag & drop tender PDFs here, or click above to browse.</div>
          <button type="button" class="btn btn-outline-primary btn-sm" id="btn-generate-demo-pdfs" style="margin-top:0.5rem;">
            ⚡ Load Demo Test PDFs
          </button>
        </div>
      `;
      const btn = document.getElementById('btn-generate-demo-pdfs');
      if (btn) btn.addEventListener('click', handleGenerateDemoFiles);
      return;
    }

    let html = '';
    for (const file of uploadedFiles) {
      let matchedReq = null;
      for (const [reqId, fId] of Object.entries(matches)) {
        if (fId === file.id) {
          matchedReq = requirements.find(r => r.id === reqId);
          break;
        }
      }

      const cardClass = `file-item-card ${file.isDuplicate ? 'is-duplicate' : ''} ${file.processingError ? 'is-error' : ''}`;

      let quickMatchOptions = `<option value="">Quick Match To...</option>`;
      for (const r of requirements) {
        const isCurrentMatch = (matches[r.id] === file.id);
        quickMatchOptions += `
          <option value="${r.id}" ${isCurrentMatch ? 'selected' : ''}>
            #${r.order}: ${r.title_en}
          </option>
        `;
      }

      html += `
        <div class="${cardClass}" id="file-card-${file.id}">
          <div class="file-card-top">
            <div class="file-name-meta">
              <div class="file-card-title" title="${file.filename}">${file.filename}</div>
              <div class="file-card-specs">
                <span>${formatFileSize(file.size)}</span>
                <span>•</span>
                <span>${file.pageCount} ${file.pageCount === 1 ? 'page' : 'pages'}</span>
                ${file.isDuplicate ? `
                  <span class="duplicate-flag-pill" title="${t('duplicateWarning')}">
                    ${t('duplicateBadge')}
                  </span>
                ` : ''}
              </div>
            </div>
            <button type="button" class="btn btn-icon-only btn-sm remove-file-btn" data-file-id="${file.id}" title="${t('removeFile')}">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>

          ${file.processingError ? `
            <div style="font-size:0.75rem; color:var(--color-missing); font-weight:600; padding:0.25rem 0;">
              ⚠️ ${file.processingError}
            </div>
          ` : `
            <div class="file-card-bottom">
              <div class="file-match-status">
                ${matchedReq ? `
                  <span class="match-status-matched">✓ Matched: #${matchedReq.order} ${matchedReq.title_en}</span>
                ` : `
                  <span class="match-status-unmatched">Unmatched</span>
                `}
              </div>
              ${requirements.length > 0 ? `
                <select class="custom-select file-quick-match-select" data-file-id="${file.id}" style="font-size:0.72rem; padding:0.2rem 0.4rem; max-width:140px;">
                  ${quickMatchOptions}
                </select>
              ` : ''}
            </div>
          `}
        </div>
      `;
    }

    container.innerHTML = html;

    container.querySelectorAll('.remove-file-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const fileId = e.currentTarget.dataset.fileId;
        store.removeFile(fileId);
      });
    });

    container.querySelectorAll('.file-quick-match-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const fileId = e.target.dataset.fileId;
        const targetReqId = e.target.value;
        const state = store.getState();
        const file = state.uploadedFiles.find(f => f.id === fileId);

        if (!targetReqId) {
          for (const [rId, fId] of Object.entries(state.matches)) {
            if (fId === fileId) store.unmatch(rId);
          }
          return;
        }

        const dupConflict = checkDuplicateConflict(file, targetReqId, state);
        if (dupConflict) {
          alert(`Duplicate Match Prevented:\n\nThis file has identical binary content to "${dupConflict.conflictingFileName}", which is already assigned to Requirement #${dupConflict.conflictingOrder}.\n\nUnder contest integrity rules, duplicate files cannot fulfill separate requirements.`);
          e.target.value = '';
          return;
        }

        store.setMatch(targetReqId, fileId);
      });
    });
  }

  function renderActionBar(compliance) {
    const generateBtn = document.getElementById('btn-generate-package');
    const previewBtn = document.getElementById('btn-preview-package');
    const { canGenerate, blockingIssues } = compliance;
    const state = store.getState();

    if (generateBtn) {
      generateBtn.disabled = !canGenerate;
      if (canGenerate) {
        generateBtn.classList.add('btn-pulse');
        generateBtn.title = "All requirements validated. Click to assemble final submission package.";
      } else {
        generateBtn.classList.remove('btn-pulse');
        generateBtn.title = state.tender
          ? `${blockingIssues.length} blocking issue(s) must be resolved before generating the package.`
          : "Load requirements.json to begin package assembly.";
      }
    }

    if (previewBtn) {
      previewBtn.disabled = !state.tender || state.requirements.length === 0;
    }
  }

  function renderApp() {
    const state = store.getState();
    const compliance = evaluateCompliance(state);

    renderHeader();
    renderStepper(compliance);
    renderTenderOverview();
    renderMetrics(compliance);
    renderBlockingBanner(compliance);
    renderRequirementsList(compliance);
    renderFileLibrary();
    renderActionBar(compliance);
  }

  /* ==========================================================================
     8. Event Handlers & User Actions
     ========================================================================== */

  function updateDuplicateFlags() {
    const state = store.getState();
    const files = state.uploadedFiles;
    const hashCounts = new Map();

    for (const f of files) {
      if (f.contentHash) {
        hashCounts.set(f.contentHash, (hashCounts.get(f.contentHash) || 0) + 1);
      }
    }

    for (const f of files) {
      const isDup = f.contentHash && (hashCounts.get(f.contentHash) > 1);
      if (f.isDuplicate !== isDup) {
        store.updateFile(f.id, { isDuplicate: isDup });
      }
    }
  }

  async function handleFilesSelected(fileList) {
    const state = store.getState();
    const filesArray = Array.from(fileList);

    if (filesArray.length === 0) return;

    if (state.uploadedFiles.length + filesArray.length > 30) {
      showToast(t('errFileLimit'), 'error');
      return;
    }

    let currentBytes = state.uploadedFiles.reduce((acc, f) => acc + (f.size || 0), 0);
    for (const f of filesArray) currentBytes += f.size;

    if (currentBytes > 50 * 1024 * 1024) {
      showToast(t('errSizeLimit'), 'error');
      return;
    }

    const processedList = [];

    for (const file of filesArray) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        showToast(`${t('errOnlyPdf')} (${file.name})`, 'error');
        continue;
      }

      try {
        const inspectResult = await inspectPdfFile(file);
        processedList.push({
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          filename: file.name,
          size: file.size,
          pageCount: inspectResult.pageCount,
          contentHash: inspectResult.hash,
          arrayBuffer: inspectResult.arrayBuffer,
          duplicateGroupId: null,
          isDuplicate: false,
          processingError: null
        });
      } catch (err) {
        console.error("Inspect error:", file.name, err);
        showToast(`${t('errUnreadablePdf')} (${file.name})`, 'error');
        processedList.push({
          id: `file-err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          filename: file.name,
          size: file.size,
          pageCount: 0,
          contentHash: null,
          arrayBuffer: null,
          duplicateGroupId: null,
          isDuplicate: false,
          processingError: t('errUnreadablePdf')
        });
      }
    }

    if (processedList.length > 0) {
      store.addUploadedFiles(processedList);
      updateDuplicateFlags();
      showToast(`${processedList.length} PDF(s) processed.`, 'success');
    }
  }

  async function handleGenerateDemoFiles() {
    showToast("Generating realistic multi-page test PDFs in browser...", "info");
    try {
      const demoFiles = await generateDemoPdfFiles();
      await handleFilesSelected(demoFiles);
    } catch (err) {
      console.error("Demo files error:", err);
      showToast("Failed to generate test PDFs: " + err.message, "error");
    }
  }

  function loadPresetTender(presetKey = 'standard_ict') {
    const preset = SAMPLE_TENDERS[presetKey] || SAMPLE_TENDERS.standard_ict;
    store.loadTenderSpecification(preset.tender, preset.requirements);
    showToast(`Loaded "${preset.tender.title}" (${preset.requirements.length} requirements)`, 'success');
  }

  async function handleRequirementsJsonUpload(file) {
    try {
      const text = await file.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        alert("Invalid requirements.json file: File contains malformed JSON syntax. Please check the JSON format.");
        return;
      }

      if (!json.tender || typeof json.tender !== 'object') {
        alert("Invalid requirements.json: Top-level 'tender' object is missing.");
        return;
      }

      const { tender, requirements } = json;
      if (!tender.tender_id || !tender.title || !tender.procuring_entity || !tender.bidder || !tender.submission_deadline) {
        alert("Invalid requirements.json: Tender information is missing required fields (tender_id, title, procuring_entity, bidder, or submission_deadline).");
        return;
      }

      if (!Array.isArray(requirements) || requirements.length === 0) {
        alert("Invalid requirements.json: 'requirements' array is missing or empty.");
        return;
      }

      for (let i = 0; i < requirements.length; i++) {
        const r = requirements[i];
        if (!r.id || typeof r.id !== 'string') {
          alert(`Invalid requirements.json: Item #${i + 1} has an invalid or missing 'id'.`);
          return;
        }
        if (r.order === undefined || isNaN(Number(r.order)) || Number(r.order) <= 0) {
          alert(`Invalid requirements.json: Item #${i + 1} ('${r.id}') has an invalid 'order' value (must be a positive number).`);
          return;
        }
        if (!r.title_en || typeof r.title_en !== 'string') {
          alert(`Invalid requirements.json: Item #${i + 1} ('${r.id}') has a missing 'title_en'.`);
          return;
        }
        if (typeof r.mandatory !== 'boolean') {
          alert(`Invalid requirements.json: Item #${i + 1} ('${r.id}') is missing boolean 'mandatory' flag.`);
          return;
        }
      }

      store.loadTenderSpecification(tender, requirements);
      showToast(`Successfully imported tender ${tender.tender_id} (${requirements.length} requirements).`, 'success');

    } catch (err) {
      console.error("Requirements upload error:", err);
      alert(`Failed to load requirements.json: ${err.message}`);
    }
  }

  function handleOpenAutoMatch() {
    const state = store.getState();
    const suggestions = generateAutoMatchSuggestions(state.requirements, state.uploadedFiles, state.matches);

    if (suggestions.length === 0) {
      showToast("No new match suggestions available based on filename similarity.", "info");
      return;
    }

    const modal = document.getElementById('auto-match-modal');
    const listEl = document.getElementById('auto-match-list');
    if (!modal || !listEl) return;

    let html = '';
    for (const s of suggestions) {
      html += `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem; border-bottom:1px solid var(--color-border); font-size:0.85rem;">
          <div>
            <div style="font-weight:700;">#${s.requirementOrder}: ${s.requirementTitle}</div>
            <div style="color:var(--color-primary); font-size:0.8rem;">⇄ ${s.filename}</div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--color-ok);">${s.score}% Match</span>
            <input type="checkbox" class="auto-match-check" data-req-id="${s.requirementId}" data-file-id="${s.fileId}" checked />
          </div>
        </div>
      `;
    }

    listEl.innerHTML = html;
    modal.classList.add('is-open');

    const applyBtn = document.getElementById('btn-apply-auto-matches');
    applyBtn.onclick = () => {
      let appliedCount = 0;
      modal.querySelectorAll('.auto-match-check:checked').forEach(cb => {
        store.setMatch(cb.dataset.reqId, cb.dataset.fileId);
        appliedCount++;
      });
      modal.classList.remove('is-open');
      showToast(`Applied ${appliedCount} suggestion(s).`, 'success');
    };
  }

  function handleOpenPackagePreview() {
    const modal = document.getElementById('preview-modal');
    const body = document.getElementById('preview-modal-body');
    if (!modal || !body) return;

    const state = store.getState();
    const compliance = evaluateCompliance(state);
    const { requirements } = state;
    const includeIndex = state.options.includeIndexPage;

    let totalPages = 1 + (includeIndex ? 1 : 0);
    let runningStartPage = totalPages + 1;

    let rowsHtml = '';
    rowsHtml += `
      <tr>
        <td style="padding:0.6rem;">1</td>
        <td style="padding:0.6rem;"><strong>Official Cover Page</strong></td>
        <td style="padding:0.6rem;">Generated in-browser (English)</td>
        <td style="padding:0.6rem;">1</td>
        <td style="padding:0.6rem;">Page 1</td>
      </tr>
    `;

    if (includeIndex) {
      rowsHtml += `
        <tr>
          <td style="padding:0.6rem;">2</td>
          <td style="padding:0.6rem;"><strong>Table of Contents / Index Page</strong></td>
          <td style="padding:0.6rem;">Generated in-browser</td>
          <td style="padding:0.6rem;">1</td>
          <td style="padding:0.6rem;">Page 2</td>
        </tr>
      `;
    }

    for (const req of requirements) {
      const statusData = compliance.statusMap.get(req.id);
      if (statusData && statusData.matchedFile) {
        const file = statusData.matchedFile;
        const endPage = runningStartPage + file.pageCount - 1;
        const span = (file.pageCount > 1) ? `pp. ${runningStartPage} - ${endPage}` : `p. ${runningStartPage}`;

        rowsHtml += `
          <tr style="border-bottom:1px solid var(--color-border-subtle);">
            <td style="padding:0.6rem;">${req.order}</td>
            <td style="padding:0.6rem;">${req.title_en}</td>
            <td style="padding:0.6rem;">${file.filename}</td>
            <td style="padding:0.6rem;">${file.pageCount}</td>
            <td style="padding:0.6rem;"><strong>${span}</strong></td>
          </tr>
        `;

        totalPages += file.pageCount;
        runningStartPage += file.pageCount;
      }
    }

    body.innerHTML = `
      <div style="font-size:0.9rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; background:var(--color-surface-alt); padding:0.75rem 1rem; border-radius:var(--radius-md);">
        <div>Total Enclosed Documents: <strong>${compliance.metrics.ok}</strong></div>
        <div>Total Expected Pages: <strong>${totalPages} pages</strong></div>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--color-border); background:var(--color-surface-alt);">
              <th style="padding:0.6rem;">Order</th>
              <th style="padding:0.6rem;">Document Title</th>
              <th style="padding:0.6rem;">Source File</th>
              <th style="padding:0.6rem;">Pages</th>
              <th style="padding:0.6rem;">Page Range</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;

    modal.classList.add('is-open');
  }

  function handleExportChecklistCsv() {
    const state = store.getState();
    const compliance = evaluateCompliance(state);

    const rows = [
      ["Tender ID", state.tender?.tender_id || ""],
      ["Tender Title", state.tender?.title || ""],
      ["Submission Deadline", state.tender?.submission_deadline || ""],
      [],
      ["Order", "Requirement ID", "Document Title (EN)", "Document Title (BN)", "Mandatory", "Status", "Matched File", "Pages", "Expiry Date"]
    ];

    for (const req of state.requirements) {
      const statusData = compliance.statusMap.get(req.id);
      const fileName = statusData?.matchedFile?.filename || "None";
      const pages = statusData?.matchedFile?.pageCount || 0;
      const expiry = statusData?.expiryDate || "N/A";
      const status = statusData ? statusData.status : "missing";

      rows.push([
        req.order,
        req.id,
        `"${(req.title_en || "").replace(/"/g, '""')}"`,
        `"${(req.title_bn || "").replace(/"/g, '""')}"`,
        req.mandatory ? "YES" : "NO",
        status,
        `"${fileName.replace(/"/g, '""')}"`,
        pages,
        expiry
      ]);
    }

    const csvContent = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.tender?.tender_id || "Tender"}_Checklist.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    showToast("Checklist CSV exported successfully.", "success");
  }

  function handleSaveProject() {
    const state = store.getState();
    const projectData = {
      version: "1.0",
      savedAt: new Date().toISOString(),
      tender: state.tender,
      requirements: state.requirements,
      matches: state.matches,
      expiries: state.expiries,
      options: state.options
    };

    const jsonStr = JSON.stringify(projectData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.tender?.tender_id || "Tender"}_Project.tenderflow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);

    showToast(t('projectSaved'), "success");
  }

  async function handleOpenProjectFile(file) {
    try {
      const text = await file.text();
      const project = JSON.parse(text);
      if (!project.tender || !project.requirements) {
        alert("Invalid project file structure: tender or requirements missing.");
        return;
      }

      store.loadTenderSpecification(project.tender, project.requirements);
      if (project.expiries) {
        for (const [rId, date] of Object.entries(project.expiries)) {
          store.setExpiryDate(rId, date);
        }
      }
      if (project.options) {
        store.setOptions(project.options);
      }

      showToast(t('projectLoaded'), "success");
    } catch (err) {
      console.error("Open project error:", err);
      alert("Failed to load project file: " + err.message);
    }
  }

  async function handleGeneratePackage() {
    const state = store.getState();
    const compliance = evaluateCompliance(state);

    if (!compliance.canGenerate) {
      showToast(t('blockingTitle'), "error");
      return;
    }

    const modal = document.getElementById('gen-progress-modal');
    const card = modal?.querySelector('.modal-card');
    if (!modal || !card) return;

    card.innerHTML = `
      <div class="modal-body" style="padding:2.5rem 1.5rem; display:flex; flex-direction:column; align-items:center; gap:1.25rem;">
        <div class="spinner" style="width:40px; height:40px; border-width:3px;"></div>
        <div style="text-align:center;">
          <h4 style="font-size:1.15rem; font-weight:700; color:var(--color-text-main); margin-bottom:0.35rem;">Assembling Final Tender Package</h4>
          <p id="gen-progress-label" style="font-size:0.85rem; color:var(--color-text-muted);">Preparing official cover page...</p>
        </div>
        <div style="width:100%; height:8px; background:var(--color-border); border-radius:999px; overflow:hidden;">
          <div id="gen-progress-bar" style="width:10%; height:100%; background:linear-gradient(90deg, var(--color-primary), var(--color-accent)); transition:width 0.25s ease;"></div>
        </div>
      </div>
    `;
    modal.classList.add('is-open');

    const bar = document.getElementById('gen-progress-bar');
    const label = document.getElementById('gen-progress-label');

    try {
      const sigConfig = state.options.signatureDataUrl ? {
        dataUrl: state.options.signatureDataUrl,
        placement: state.options.signaturePlacement,
        scale: state.options.signatureScale
      } : null;

      const pdfBytes = await assembleTenderPackage({
        tender: state.tender,
        orderedRequirements: state.requirements,
        statusMap: compliance.statusMap,
        includeIndexPage: state.options.includeIndexPage,
        signatureConfig: sigConfig,
        onProgress: (stageMessage, percent) => {
          if (bar) bar.style.width = `${percent}%`;
          if (label) label.textContent = stageMessage;
        }
      });

      lastGeneratedBytes = pdfBytes;
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      if (lastGeneratedBlobUrl) URL.revokeObjectURL(lastGeneratedBlobUrl);
      lastGeneratedBlobUrl = URL.createObjectURL(blob);

      const cleanTenderId = (state.tender?.tender_id || "TENDER").replace(/[^a-zA-Z0-9_-]/g, '_');
      lastGeneratedFilename = `${cleanTenderId}_Package.pdf`;

      downloadPackagePdf(pdfBytes, state.tender?.tender_id);

      setTimeout(() => {
        const nowStr = new Date().toLocaleString();
        card.innerHTML = `
          <div class="modal-header">
            <h4 class="modal-title" style="color:var(--color-ok);">✓ Package Generated Successfully</h4>
            <button type="button" class="btn btn-icon-only btn-close-modal" aria-label="Close">&times;</button>
          </div>
          <div class="modal-body" style="padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
            <div style="background:var(--color-ok-bg); border:1px solid var(--color-ok-border); border-radius:var(--radius-md); padding:1rem; font-size:0.85rem; color:var(--color-ok-text);">
              Your submission package has been compiled and downloaded as <strong>${lastGeneratedFilename}</strong>.
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.85rem;">
              <div style="background:var(--color-surface-alt); padding:0.75rem; border-radius:var(--radius-sm);">
                <div style="font-size:0.72rem; text-transform:uppercase; color:var(--color-text-muted);">Generated Filename</div>
                <div style="font-weight:700; color:var(--color-primary); word-break:break-all;">${lastGeneratedFilename}</div>
              </div>
              <div style="background:var(--color-surface-alt); padding:0.75rem; border-radius:var(--radius-sm);">
                <div style="font-size:0.72rem; text-transform:uppercase; color:var(--color-text-muted);">Total Enclosed Documents</div>
                <div style="font-weight:700; color:var(--color-text-main);">${compliance.metrics.ok} Documents</div>
              </div>
              <div style="background:var(--color-surface-alt); padding:0.75rem; border-radius:var(--radius-sm);">
                <div style="font-size:0.72rem; text-transform:uppercase; color:var(--color-text-muted);">Generation Date</div>
                <div style="font-weight:700; color:var(--color-text-main);">${nowStr}</div>
              </div>
              <div style="background:var(--color-surface-alt); padding:0.75rem; border-radius:var(--radius-sm);">
                <div style="font-size:0.72rem; text-transform:uppercase; color:var(--color-text-muted);">File Size</div>
                <div style="font-weight:700; color:var(--color-text-main);">${formatFileSize(pdfBytes.length)}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="display:flex; justify-content:space-between;">
            <a href="${lastGeneratedBlobUrl}" target="_blank" class="btn btn-secondary">
              👁️ Open PDF Preview
            </a>
            <button type="button" class="btn btn-primary" id="btn-re-download">
              ⬇️ Download Again (${lastGeneratedFilename})
            </button>
          </div>
        `;

        card.querySelector('.btn-close-modal')?.addEventListener('click', () => {
          modal.classList.remove('is-open');
        });

        card.querySelector('#btn-re-download')?.addEventListener('click', () => {
          downloadPackagePdf(lastGeneratedBytes, state.tender?.tender_id);
        });
      }, 600);

    } catch (err) {
      console.error("Package assembly error:", err);
      card.innerHTML = `
        <div class="modal-header">
          <h4 class="modal-title" style="color:var(--color-missing);">Assembly Failed</h4>
          <button type="button" class="btn btn-icon-only btn-close-modal">&times;</button>
        </div>
        <div class="modal-body" style="padding:1.5rem; font-size:0.85rem; color:var(--color-missing-text);">
          <p><strong>Error assembling package:</strong></p>
          <p style="margin-top:0.5rem; background:#fee2e2; padding:0.75rem; border-radius:var(--radius-sm); font-family:monospace;">${err.message}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-close-modal">Close</button>
        </div>
      `;
      card.querySelectorAll('.btn-close-modal').forEach(b => b.onclick = () => modal.classList.remove('is-open'));
    }
  }

  /* ==========================================================================
     9. Bootstrapping & Global Event Listeners
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', () => {
    store.subscribe(() => {
      renderApp();
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedLang = e.currentTarget.dataset.lang;
        setLang(selectedLang);
        renderApp();
      });
    });

    const reqFileInput = document.getElementById('req-file-input');
    const btnLoadReq = document.getElementById('btn-load-requirements');
    if (btnLoadReq && reqFileInput) {
      btnLoadReq.addEventListener('click', () => reqFileInput.click());
      reqFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleRequirementsJsonUpload(e.target.files[0]);
          e.target.value = '';
        }
      });
    }

    const presetSelect = document.getElementById('preset-tender-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        if (e.target.value) {
          loadPresetTender(e.target.value);
          e.target.value = '';
        }
      });
    }

    const btnDownloadSampleJson = document.getElementById('btn-download-sample-json');
    if (btnDownloadSampleJson) {
      btnDownloadSampleJson.addEventListener('click', () => {
        downloadSampleRequirementsJson('standard_ict');
      });
    }

    const dropzone = document.getElementById('pdf-dropzone');
    const pdfFileInput = document.getElementById('pdf-file-input');

    if (dropzone && pdfFileInput) {
      dropzone.addEventListener('click', () => pdfFileInput.click());

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('drag-over');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          handleFilesSelected(dt.files);
        }
      });

      pdfFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFilesSelected(e.target.files);
          e.target.value = '';
        }
      });
    }

    const btnClearFiles = document.getElementById('btn-clear-files');
    if (btnClearFiles) {
      btnClearFiles.addEventListener('click', () => {
        if (confirm("Are you sure you want to remove all uploaded PDFs?")) {
          store.clearFiles();
        }
      });
    }

    document.querySelectorAll('.metric-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        const current = store.getState().activeFilter;
        store.setActiveFilter(current === filter ? 'all' : filter);
      });
    });

    const clearFilterHint = document.getElementById('filter-clear-hint');
    if (clearFilterHint) {
      clearFilterHint.addEventListener('click', () => {
        store.setActiveFilter('all');
      });
    }

    const btnAutoMatch = document.getElementById('btn-auto-match');
    if (btnAutoMatch) {
      btnAutoMatch.addEventListener('click', handleOpenAutoMatch);
    }

    const btnPreview = document.getElementById('btn-preview-package');
    if (btnPreview) {
      btnPreview.addEventListener('click', handleOpenPackagePreview);
    }

    const btnGenerate = document.getElementById('btn-generate-package');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', handleGeneratePackage);
    }

    const btnExportCsv = document.getElementById('btn-export-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', handleExportChecklistCsv);
    }

    const btnSaveProject = document.getElementById('btn-save-project');
    const btnOpenProject = document.getElementById('btn-open-project');
    const projectFileInput = document.getElementById('project-file-input');

    if (btnSaveProject) {
      btnSaveProject.addEventListener('click', handleSaveProject);
    }
    if (btnOpenProject && projectFileInput) {
      btnOpenProject.addEventListener('click', () => projectFileInput.click());
      projectFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleOpenProjectFile(e.target.files[0]);
          e.target.value = '';
        }
      });
    }

    const chkIndex = document.getElementById('opt-include-index');
    if (chkIndex) {
      chkIndex.addEventListener('change', (e) => {
        store.setOptions({ includeIndexPage: e.target.checked });
      });
    }

    const sigInput = document.getElementById('sig-file-input');
    const btnUploadSig = document.getElementById('btn-upload-sig');
    const btnRemoveSig = document.getElementById('btn-remove-sig');
    const sigPreview = document.getElementById('sig-preview-img');
    const sigPlacement = document.getElementById('sig-placement-select');

    if (btnUploadSig && sigInput) {
      btnUploadSig.addEventListener('click', () => sigInput.click());
      sigInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/png') {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const dataUrl = evt.target.result;
            store.setOptions({ signatureDataUrl: dataUrl });
            if (sigPreview) {
              sigPreview.src = dataUrl;
              sigPreview.style.display = 'block';
            }
            if (btnRemoveSig) btnRemoveSig.style.display = 'inline-flex';
            showToast("Digital seal/signature loaded for package stamping.", "success");
          };
          reader.readAsDataURL(file);
        } else {
          showToast("Please upload a transparent PNG image for signature/seal.", "error");
        }
        e.target.value = '';
      });
    }

    if (btnRemoveSig) {
      btnRemoveSig.addEventListener('click', () => {
        store.setOptions({ signatureDataUrl: null });
        if (sigPreview) sigPreview.style.display = 'none';
        btnRemoveSig.style.display = 'none';
        showToast("Digital seal removed.", "info");
      });
    }

    if (sigPlacement) {
      sigPlacement.addEventListener('change', (e) => {
        store.setOptions({ signaturePlacement: e.target.value });
      });
    }

    const btnHelp = document.getElementById('btn-open-help');
    const helpModal = document.getElementById('help-modal');
    if (btnHelp && helpModal) {
      btnHelp.addEventListener('click', () => helpModal.classList.add('is-open'));
    }

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('is-open');
      });
      backdrop.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => backdrop.classList.remove('is-open'));
      });
    });

    // Start with clean initial state
    renderApp();
  });

})();
