/**
 * TenderFlow — Central Document Status Engine & Validation Engine
 * 
 * Strictly implements the 5 statuses and blocking logic specified in the prompt:
 * 1. Missing (blocking: true)
 * 2. Expiry date needed (blocking: true)
 * 3. Expired (blocking: true)
 * 4. Not provided (blocking: false)
 * 5. OK (blocking: false)
 * 
 * In addition, tracks duplicate file violations across requirements.
 */

export const STATUS_TYPES = {
  MISSING: 'missing',
  EXPIRY_NEEDED: 'expiry_needed',
  EXPIRED: 'expired',
  NOT_PROVIDED: 'not_provided',
  OK: 'ok'
};

/**
 * Normalizes date to 'YYYY-MM-DD' comparison
 */
function normalizeDate(dateStr) {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return dateStr.trim();
}

/**
 * Computes status for a single requirement
 * 
 * @param {Object} req - The requirement object
 * @param {Object|null} matchedFile - The matched UploadedFile object or null
 * @param {string|null} expiryDate - The entered expiry date (YYYY-MM-DD)
 * @param {string} submissionDeadline - The tender submission deadline (YYYY-MM-DD)
 * @returns {Object} { status, isBlocking, reasonKey, reasonParams }
 */
export function computeRequirementStatus(req, matchedFile, expiryDate, submissionDeadline) {
  const isMandatory = Boolean(req.mandatory);
  const hasExpiry = Boolean(req.has_expiry);
  const hasFile = Boolean(matchedFile);

  // Case 1: No file matched
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

  // Case 2: File is matched
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

    // Date comparison: YYYY-MM-DD string comparison is lexicographically equivalent to chronological comparison
    if (cleanExpiry < cleanDeadline) {
      return {
        status: STATUS_TYPES.EXPIRED,
        isBlocking: true,
        reasonKey: 'reason_expired',
        reasonParams: { expiry: cleanExpiry, deadline: cleanDeadline }
      };
    }

    // If cleanExpiry >= cleanDeadline (including exact equality), status is OK
    return {
      status: STATUS_TYPES.OK,
      isBlocking: false,
      reasonKey: 'reason_ok'
    };
  }

  // File is matched and does not require expiry
  return {
    status: STATUS_TYPES.OK,
    isBlocking: false,
    reasonKey: 'reason_ok'
  };
}

/**
 * Validates the entire store state and returns comprehensive metrics & statuses
 * 
 * @param {Object} state - The full application state
 * @returns {Object} Validation summary including statusMap, metrics, and blockingIssues
 */
export function evaluateCompliance(state) {
  const { tender, requirements, uploadedFiles, matches, expiries } = state;
  const deadline = tender?.submission_deadline || '';

  const fileMap = new Map();
  for (const f of uploadedFiles) {
    fileMap.set(f.id, f);
  }

  const statusMap = new Map(); // reqId -> status object
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

  // Check duplicate files in uploaded files
  const hashGroups = new Map();
  for (const f of uploadedFiles) {
    if (f.contentHash) {
      if (!hashGroups.has(f.contentHash)) {
        hashGroups.set(f.contentHash, []);
      }
      hashGroups.get(f.contentHash).push(f);
    }
  }

  let duplicateFilesCount = 0;
  for (const [hash, group] of hashGroups.entries()) {
    if (group.length > 1) {
      duplicateFilesCount += group.length;
    }
  }
  metrics.duplicates = duplicateFilesCount;

  // Track matched file hashes to prevent identical binary documents satisfying two requirements
  const matchedHashes = new Map(); // hash -> reqId

  for (const req of requirements) {
    const fileId = matches[req.id];
    const matchedFile = fileId ? fileMap.get(fileId) : null;
    const expiryDate = expiries[req.id] || null;

    const evaluation = computeRequirementStatus(req, matchedFile, expiryDate, deadline);

    // Duplicate match restriction check:
    // If two different requirements are matched to files with identical content hash
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
      evaluation.isBlocking = true; // Duplicate matching is a blocking error
    }

    statusMap.set(req.id, {
      ...evaluation,
      matchedFile,
      expiryDate,
      req
    });

    // Update count metrics
    switch (evaluation.status) {
      case STATUS_TYPES.OK:
        metrics.ok++;
        break;
      case STATUS_TYPES.MISSING:
        metrics.missing++;
        break;
      case STATUS_TYPES.EXPIRY_NEEDED:
        metrics.expiry_needed++;
        break;
      case STATUS_TYPES.EXPIRED:
        metrics.expired++;
        break;
      case STATUS_TYPES.NOT_PROVIDED:
        metrics.not_provided++;
        break;
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
