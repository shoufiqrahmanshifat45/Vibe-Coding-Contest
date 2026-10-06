/**
 * TenderFlow — Intelligent Tender Package Builder
 * Production Unified Bundle (Offline & file:// Protocol Compatible)
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
        tender: {
          tender_id: "T-2026-0417",
          title: "Procurement of High-Performance IT Infrastructure & Datacenter Equipment",
          procuring_entity: "Department of Digital Transformation",
          bidder: "Apex Technologies & Solutions Ltd.",
          submission_deadline: "2026-11-30"
        },
        requirements: [],
        uploadedFiles: [],
        matches: {},       // requirementId -> fileId
        expiries: {},      // requirementId -> YYYY-MM-DD
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
        listener(this.state);
      }
    }

    setTender(tenderData) {
      this.state.tender = { ...tenderData };
      this.notify();
    }

    setRequirements(requirements) {
      const sorted = [...requirements].sort((a, b) => Number(a.order) - Number(b.order));
      this.state.requirements = sorted;
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
        this.state.expiries[requirementId] = dateString;
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
    const match = String(dateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
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

      // If cleanExpiry >= cleanDeadline, status is OK (including exact equality)
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
    const { tender, requirements, uploadedFiles, matches, expiries } = state;
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

    // Duplicate detection in file library
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
      canGenerate: blockingIssues.length === 0 && requirements.length > 0
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

  function generateAutoMatchSuggestions(requirements, uploadedFiles, currentMatches = {}) {
    const suggestions = [];
    const usedFileIds = new Set(Object.values(currentMatches));
    const availableFiles = uploadedFiles.filter(f => !f.processingError && !usedFileIds.has(f.id));
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
    const { matches, uploadedFiles } = state;
    const fileMap = new Map(uploadedFiles.map(f => [f.id, f]));

    for (const [reqId, matchedFileId] of Object.entries(matches)) {
      if (reqId === targetReqId) continue;
      const existingFile = fileMap.get(matchedFileId);
      if (existingFile && existingFile.contentHash === file.contentHash) {
        return {
          conflictingReqId: reqId,
          conflictingFileName: existingFile.filename
        };
      }
    }
    return null;
  }

  /* ==========================================================================
     5. PDF Processing Engine (pdf-lib & Web Crypto)
     ========================================================================== */

  async function calculateSha256(arrayBuffer) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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

    onProgress(10, "Initializing package document...");
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
    onProgress(20, "Creating official cover page...");
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
    coverPage.drawText(`TENDER REF: ${tender.tender_id || 'N/A'}`, {
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
    const safeTitle = tender.title || 'Untitled Tender';
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
    coverPage.drawText(tender.procuring_entity || 'N/A', { x: col1X, y: gridStartY - 15, size: 11, font: fontRegular, color: textColor });

    coverPage.drawText("BIDDER / TENDERER:", { x: col2X, y: gridStartY, size: 8, font: fontBold, color: textMuted });
    coverPage.drawText(tender.bidder || 'N/A', { x: col2X, y: gridStartY - 15, size: 11, font: fontBold, color: primaryColor });

    coverPage.drawText("SUBMISSION DEADLINE:", { x: col1X, y: gridStartY - 40, size: 8, font: fontBold, color: textMuted });
    coverPage.drawText(tender.submission_deadline || 'N/A', { x: col1X, y: gridStartY - 55, size: 11, font: fontBold, color: rgb(0.8, 0.2, 0.2) });

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
      onProgress(35, "Generating Table of Contents / Index...");
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

    // --- 4. SIGNATURE / SEAL PNG EMBEDDING ---
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
    onProgress(90, "Applying dynamic pagination footers...");
    const totalFinalPages = packageDoc.getPageCount();
    const pages = packageDoc.getPages();

    for (let idx = 0; idx < totalFinalPages; idx++) {
      const page = pages[idx];
      const { width: pWidth } = page.getSize();
      const pageNumber = idx + 1;
      const footerText = `${tender.tender_id || 'TenderFlow'} | Page ${pageNumber} of ${totalFinalPages}`;

      const textWidth = fontRegular.widthOfTextAtSize(footerText, 8);
      const footerX = (pWidth - textWidth) / 2;
      const footerY = 16;

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

    onProgress(98, "Finalizing package bytes...");
    const pdfBytes = await packageDoc.save();
    onProgress(100, "Package generated successfully!");

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

    setTimeout(() => URL.revokeObjectURL(downloadUrl), 15000);
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
     ========================================================================= */

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
    const hasReqs = state.requirements.length > 0;
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

    const idEl = document.getElementById('tender-id-display');
    const titleEl = document.getElementById('tender-title-display');
    const entityEl = document.getElementById('tender-entity-display');
    const bidderEl = document.getElementById('tender-bidder-display');
    const deadlineEl = document.getElementById('tender-deadline-display');

    if (idEl) idEl.textContent = tender.tender_id || 'N/A';
    if (titleEl) titleEl.textContent = tender.title || 'Untitled Tender';
    if (entityEl) entityEl.textContent = tender.procuring_entity || 'N/A';
    if (bidderEl) bidderEl.textContent = tender.bidder || 'N/A';
    if (deadlineEl) deadlineEl.textContent = tender.submission_deadline || 'YYYY-MM-DD';
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

    const { blockingIssues, canGenerate } = compliance;
    const lang = getLang();

    if (canGenerate) {
      banner.className = 'blocking-alert-card ready-state';
      banner.innerHTML = `
        <div class="alert-icon-box">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="alert-content-box">
          <div class="alert-headline">${t('allReadyTitle')}</div>
          <div class="alert-subtext">${t('allReadyDesc')}</div>
        </div>
      `;
    } else {
      banner.className = 'blocking-alert-card has-blocking';

      let issuesChipsHtml = '';
      for (const issue of blockingIssues) {
        const title = (lang === 'bn' && issue.title_bn) ? issue.title_bn : issue.title_en;
        let statusLabel = t(`status_${issue.status}`);
        if (issue.duplicateConflict) {
          statusLabel = t('duplicateBadge');
        }

        issuesChipsHtml += `
          <button class="blocking-issue-chip" data-req-id="${issue.reqId}">
            <span>#${issue.order}: ${title}</span>
            <strong>(${statusLabel})</strong>
          </button>
        `;
      }

      banner.innerHTML = `
        <div class="alert-icon-box">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <div class="alert-content-box">
          <div class="alert-headline">${t('blockingTitle')} (${blockingIssues.length} ${t('blockingIssues').toLowerCase()})</div>
          <div class="alert-subtext">${t('blockingDesc')}</div>
          <div class="blocking-issues-list">${issuesChipsHtml}</div>
        </div>
      `;

      banner.querySelectorAll('.blocking-issue-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const reqId = chip.dataset.reqId;
          const targetRow = document.getElementById(`req-row-${reqId}`);
          if (targetRow) {
            targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetRow.classList.add('highlighted');
            setTimeout(() => targetRow.classList.remove('highlighted'), 2500);
          }
        });
      });
    }
  }

  function renderRequirementsList(compliance) {
    const container = document.getElementById('requirements-list-container');
    if (!container) return;

    const state = store.getState();
    const { requirements, uploadedFiles, matches, expiries, activeFilter } = state;
    const { statusMap } = compliance;
    const lang = getLang();

    if (requirements.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-title">No Requirements Loaded</div>
          <div class="empty-state-desc">Start by loading requirements.json or click "Load Sample Tender" above.</div>
          <button class="btn btn-primary btn-sm" id="btn-load-sample-empty">${t('sampleTenders')}</button>
        </div>
      `;
      const btn = document.getElementById('btn-load-sample-empty');
      if (btn) btn.addEventListener('click', () => loadPresetTender('standard_ict'));
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

    const validFiles = uploadedFiles.filter(f => !f.processingError);

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
      if (statusData && statusData.duplicateConflict) {
        statusText = `${t(`status_${status}`)} (${t('duplicateBadge')})`;
      }

      let selectOptionsHtml = `<option value="">${t('selectFilePlaceholder')}</option>`;
      for (const file of validFiles) {
        const isSelected = (file.id === matchedFileId);
        let matchLabel = '';
        for (const [rId, fId] of Object.entries(matches)) {
          if (fId === file.id && rId !== req.id) {
            const otherReq = requirements.find(r => r.id === rId);
            matchLabel = ` [In use: #${otherReq?.order || rId}]`;
            break;
          }
        }

        let dupLabel = file.isDuplicate ? ` [${t('duplicateBadge')}]` : '';

        selectOptionsHtml += `
          <option value="${file.id}" ${isSelected ? 'selected' : ''}>
            ${file.filename} (${file.pageCount} ${file.pageCount === 1 ? 'page' : 'pages'})${dupLabel}${matchLabel}
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
                <button class="btn btn-secondary btn-sm req-unmatch-btn" data-req-id="${req.id}">
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

        if (fileId) {
          const state = store.getState();
          const selectedFile = state.uploadedFiles.find(f => f.id === fileId);
          const dupConflict = checkDuplicateConflict(selectedFile, reqId, state);

          if (dupConflict) {
            showToast(t('duplicateMatchBlocked'), 'warning');
          }
          store.setMatch(reqId, fileId);
        } else {
          store.unmatch(reqId);
        }
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
    const { uploadedFiles, matches, requirements } = state;

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
          <div class="empty-state-desc">Drag & drop tender PDFs here, or click to browse.</div>
          <button class="btn btn-outline-primary btn-sm" id="btn-generate-demo-pdfs" style="margin-top:0.5rem;">
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
            <button class="btn btn-icon-only btn-sm remove-file-btn" data-file-id="${file.id}" title="${t('removeFile')}">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>

          ${file.processingError ? `
            <div style="font-size:0.75rem; color:var(--color-missing); font-weight:600;">
              ${file.processingError}
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
  }

  function renderActionBar(compliance) {
    const generateBtn = document.getElementById('btn-generate-package');
    const previewBtn = document.getElementById('btn-preview-package');
    const { canGenerate, blockingIssues } = compliance;

    if (generateBtn) {
      generateBtn.disabled = !canGenerate;
      if (canGenerate) {
        generateBtn.classList.add('btn-pulse');
        generateBtn.title = t('readyToGenerate');
      } else {
        generateBtn.classList.remove('btn-pulse');
        generateBtn.title = `${blockingIssues.length} ${t('blockingIssues').toLowerCase()}`;
      }
    }

    if (previewBtn) {
      previewBtn.disabled = store.getState().requirements.length === 0;
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
      showToast(`${processedList.length} PDF(s) processed successfully.`, 'success');
    }
  }

  async function handleGenerateDemoFiles() {
    showToast("Generating realistic multi-page test PDFs...", "info");
    try {
      const demoFiles = await generateDemoPdfFiles();
      await handleFilesSelected(demoFiles);
    } catch (err) {
      console.error("Demo files error:", err);
      showToast("Failed to generate test PDFs. " + err.message, "error");
    }
  }

  function loadPresetTender(presetKey = 'standard_ict') {
    const preset = SAMPLE_TENDERS[presetKey] || SAMPLE_TENDERS.standard_ict;
    store.setTender(preset.tender);
    store.setRequirements(preset.requirements);
    store.setActiveFilter('all');
    showToast(`Loaded "${preset.tender.title}" (${preset.requirements.length} requirements)`, 'success');
  }

  async function handleRequirementsJsonUpload(file) {
    try {
      const text = await file.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        showToast(t('errInvalidJson'), 'error');
        return;
      }

      if (!json.tender || !json.requirements || !Array.isArray(json.requirements)) {
        showToast(t('errMissingFields'), 'error');
        return;
      }

      for (const req of json.requirements) {
        if (!req.id || req.order === undefined || !req.title_en) {
          showToast("One or more requirement items are missing required fields (id, order, title_en).", 'error');
          return;
        }
      }

      store.setTender(json.tender);
      store.setRequirements(json.requirements);
      showToast(`Requirements loaded: ${json.requirements.length} documents for ${json.tender.tender_id || 'Tender'}`, 'success');
    } catch (err) {
      console.error("Requirements upload error:", err);
      showToast(t('errInvalidJson'), 'error');
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
            <div style="font-weight:700;">${s.requirementTitle}</div>
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
      showToast(`Applied ${appliedCount} match suggestion(s).`, 'success');
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
      ["Tender ID", state.tender.tender_id || ""],
      ["Tender Title", state.tender.title || ""],
      ["Submission Deadline", state.tender.submission_deadline || ""],
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
    a.download = `${state.tender.tender_id || "Tender"}_Checklist.csv`;
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
    a.download = `${state.tender.tender_id || "Tender"}_Project.tenderflow.json`;
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
        showToast("Invalid project file structure.", "error");
        return;
      }

      store.setTender(project.tender);
      store.setRequirements(project.requirements);
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
      showToast("Failed to load project file.", "error");
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
    const bar = document.getElementById('gen-progress-bar');
    const label = document.getElementById('gen-progress-label');

    if (modal) modal.classList.add('is-open');

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
        onProgress: (percent, message) => {
          if (bar) bar.style.width = `${percent}%`;
          if (label) label.textContent = message;
        }
      });

      const downloadedName = downloadPackagePdf(pdfBytes, state.tender.tender_id);
      showToast(`Package "${downloadedName}" generated and downloaded!`, "success", 6000);

      setTimeout(() => {
        if (modal) modal.classList.remove('is-open');
      }, 1200);

    } catch (err) {
      console.error("Package assembly error:", err);
      if (modal) modal.classList.remove('is-open');
      showToast(`Assembly failed: ${err.message}`, "error", 6000);
    }
  }

  /* ==========================================================================
     9. Bootstrapping & Global Event Listeners
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', () => {
    store.subscribe(() => {
      renderApp();
    });

    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedLang = e.currentTarget.dataset.lang;
        setLang(selectedLang);
        renderApp();
      });
    });

    // Requirements File Input
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

    // Presets Dropdown
    const presetSelect = document.getElementById('preset-tender-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        if (e.target.value) {
          loadPresetTender(e.target.value);
          e.target.value = '';
        }
      });
    }

    // Download Sample JSON
    const btnDownloadSampleJson = document.getElementById('btn-download-sample-json');
    if (btnDownloadSampleJson) {
      btnDownloadSampleJson.addEventListener('click', () => {
        downloadSampleRequirementsJson('standard_ict');
      });
    }

    // PDF Dropzone & Picker
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

    // Clear All Files
    const btnClearFiles = document.getElementById('btn-clear-files');
    if (btnClearFiles) {
      btnClearFiles.addEventListener('click', () => {
        if (confirm("Are you sure you want to remove all uploaded PDFs?")) {
          store.clearFiles();
        }
      });
    }

    // Metric Filter Pills
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

    // Auto-Match
    const btnAutoMatch = document.getElementById('btn-auto-match');
    if (btnAutoMatch) {
      btnAutoMatch.addEventListener('click', handleOpenAutoMatch);
    }

    // Preview Package
    const btnPreview = document.getElementById('btn-preview-package');
    if (btnPreview) {
      btnPreview.addEventListener('click', handleOpenPackagePreview);
    }

    // Generate Package
    const btnGenerate = document.getElementById('btn-generate-package');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', handleGeneratePackage);
    }

    // Export CSV
    const btnExportCsv = document.getElementById('btn-export-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', handleExportChecklistCsv);
    }

    // Save & Open Project
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

    // Package Assembly Options (Index toggle & PNG seal)
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

    // Help Modal
    const btnHelp = document.getElementById('btn-open-help');
    const helpModal = document.getElementById('help-modal');
    if (btnHelp && helpModal) {
      btnHelp.addEventListener('click', () => helpModal.classList.add('is-open'));
    }

    // Modal Closers
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('is-open');
      });
      backdrop.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => backdrop.classList.remove('is-open'));
      });
    });

    // Initial Load
    loadPresetTender('standard_ict');
  });

})();
