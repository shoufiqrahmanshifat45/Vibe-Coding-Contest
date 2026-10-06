/**
 * TenderFlow — Document Matcher & Auto-Match Engine
 * 
 * Enforces one-to-one matching, duplicate restrictions,
 * and provides intelligent filename-based auto-matching suggestions.
 */

/**
 * Normalizes text for fuzzy token matching
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\.pdf$/i, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates string similarity score between a filename and requirement titles
 */
export function calculateMatchScore(filename, requirement) {
  const cleanFile = cleanText(filename);
  const fileTokens = cleanFile.split(' ').filter(t => t.length > 1);

  const cleanEn = cleanText(requirement.title_en);
  const cleanBn = cleanText(requirement.title_bn);
  const cleanId = cleanText(requirement.id);

  const enTokens = cleanEn.split(' ').filter(t => t.length > 1);

  let score = 0;

  // Exact whole phrase match
  if (cleanFile.includes(cleanEn) || cleanEn.includes(cleanFile)) {
    score += 0.8;
  }

  // Exact ID match (e.g. req-1, doc-2)
  if (cleanFile.includes(cleanId)) {
    score += 0.5;
  }

  // Common keywords matching
  let matchedTokens = 0;
  for (const token of fileTokens) {
    if (enTokens.includes(token) || cleanEn.includes(token)) {
      matchedTokens++;
    }
  }

  if (fileTokens.length > 0) {
    score += (matchedTokens / Math.max(fileTokens.length, enTokens.length)) * 0.7;
  }

  return Math.min(score, 1.0);
}

/**
 * Generates auto-match suggestions based on current requirements and unmatched files
 * 
 * @param {Array} requirements 
 * @param {Array} uploadedFiles 
 * @param {Object} currentMatches - requirementId -> fileId
 * @returns {Array} Array of suggestions: { reqId, reqTitle, fileId, filename, score }
 */
export function generateAutoMatchSuggestions(requirements, uploadedFiles, currentMatches = {}) {
  const suggestions = [];

  // Find currently used files
  const usedFileIds = new Set(Object.values(currentMatches));
  // Available files that are not errored
  const availableFiles = uploadedFiles.filter(f => !f.processingError && !usedFileIds.has(f.id));

  // Find unmatched requirements
  const unmatchedReqs = requirements.filter(r => !currentMatches[r.id]);

  const assignedFiles = new Set();

  for (const req of unmatchedReqs) {
    let bestMatch = null;
    let highestScore = 0.35; // minimum threshold

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

/**
 * Checks if matching a file to a requirement would create a duplicate conflict
 * (i.e. another file with identical binary hash is already matched to another requirement)
 */
export function checkDuplicateConflict(file, targetReqId, state) {
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
