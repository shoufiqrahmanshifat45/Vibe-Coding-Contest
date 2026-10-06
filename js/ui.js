/**
 * TenderFlow — User Interface Component & Event Management
 */

import { store } from './state.js';
import { t, getLang, setLang } from './i18n.js';
import { evaluateCompliance, STATUS_TYPES } from './status-engine.js';
import { generateAutoMatchSuggestions, checkDuplicateConflict } from './matcher.js';
import { inspectPdfFile, assembleTenderPackage, downloadPackagePdf } from './pdf-engine.js';
import { SAMPLE_TENDERS, downloadSampleRequirementsJson, generateDemoPdfFiles } from './sample-data.js';

/**
 * Format bytes to human readable string (KB, MB)
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Show a toast notification
 */
export function showToast(message, type = 'info', duration = 4000) {
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

/**
 * Render Header and Navigation
 */
export function renderHeader() {
  const lang = getLang();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

/**
 * Render Workflow Stepper based on state progress
 */
export function renderStepper(compliance) {
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

/**
 * Render Tender Hero Overview
 */
export function renderTenderOverview() {
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

/**
 * Render Validation Metrics Dashboard
 */
export function renderMetrics(compliance) {
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

  // Active pill highlight
  document.querySelectorAll('.metric-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === activeFilter);
  });

  const clearHint = document.getElementById('filter-clear-hint');
  if (clearHint) {
    clearHint.style.display = (activeFilter !== 'all') ? 'flex' : 'none';
  }
}

/**
 * Render Blocking Issues Alert Banner
 */
export function renderBlockingBanner(compliance) {
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

    // Click on chip jumps to row
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

/**
 * Render Requirements Checklist Rows
 */
export function renderRequirementsList(compliance) {
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

  // Filter requirements if activeFilter is set
  const filtered = requirements.filter(req => {
    if (activeFilter === 'all') return true;
    const statusData = statusMap.get(req.id);
    if (!statusData) return true;

    if (activeFilter === 'duplicate') {
      return Boolean(statusData.duplicateConflict);
    }
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

  // Available files for matching
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

    // Status badge class and text
    const statusBadgeClass = `status-${status}`;
    let statusText = t(`status_${status}`);
    if (statusData && statusData.duplicateConflict) {
      statusText = `${t(`status_${status}`)} (${t('duplicateBadge')})`;
    }

    // Build select dropdown options
    let selectOptionsHtml = `<option value="">${t('selectFilePlaceholder')}</option>`;
    for (const file of validFiles) {
      const isSelected = (file.id === matchedFileId);
      // Check if file is already matched elsewhere
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
            <span class="status-dot">●</span>
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

  // Bind change events
  container.querySelectorAll('.req-file-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const reqId = e.target.dataset.reqId;
      const fileId = e.target.value;

      if (fileId) {
        // Check duplicate restriction
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

/**
 * Render PDF File Library
 */
export function renderFileLibrary() {
  const container = document.getElementById('uploaded-files-list');
  if (!container) return;

  const state = store.getState();
  const { uploadedFiles, matches, requirements } = state;

  // Update storage & count bar
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
    // Find if matched
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

/**
 * Render Package Generation & Action Bar
 */
export function renderActionBar(compliance) {
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

/**
 * Full UI Re-render
 */
export function renderApp() {
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

/**
 * Handle File Upload (Drag and drop or file picker)
 */
export async function handleFilesSelected(fileList) {
  const state = store.getState();
  const filesArray = Array.from(fileList);

  if (filesArray.length === 0) return;

  // Enforce Max 30 files limit
  if (state.uploadedFiles.length + filesArray.length > 30) {
    showToast(t('errFileLimit'), 'error');
    return;
  }

  // Calculate total size with incoming files
  let currentBytes = state.uploadedFiles.reduce((acc, f) => acc + (f.size || 0), 0);
  for (const f of filesArray) {
    currentBytes += f.size;
  }

  if (currentBytes > 50 * 1024 * 1024) {
    showToast(t('errSizeLimit'), 'error');
    return;
  }

  const processedList = [];

  for (const file of filesArray) {
    // Reject non-PDFs
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
      // Still add as errored file so user sees it in the library
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

/**
 * Updates duplicate flags across all uploaded files based on contentHash
 */
export function updateDuplicateFlags() {
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

/**
 * Generate Demo PDF Files for judge testing
 */
export async function handleGenerateDemoFiles() {
  showToast("Generating realistic multi-page test PDFs...", "info");
  try {
    const demoFiles = await generateDemoPdfFiles();
    await handleFilesSelected(demoFiles);
  } catch (err) {
    console.error("Demo files error:", err);
    showToast("Failed to generate test PDFs. " + err.message, "error");
  }
}

/**
 * Load Preset Tender requirements
 */
export function loadPresetTender(presetKey = 'standard_ict') {
  const preset = SAMPLE_TENDERS[presetKey] || SAMPLE_TENDERS.standard_ict;
  store.setTender(preset.tender);
  store.setRequirements(preset.requirements);
  store.setActiveFilter('all');
  showToast(`Loaded "${preset.tender.title}" (${preset.requirements.length} requirements)`, 'success');
}

/**
 * Parse and load requirements.json file
 */
export async function handleRequirementsJsonUpload(file) {
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

    // Validate required requirement fields
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

/**
 * Handle Auto-Match Suggestions
 */
export function handleOpenAutoMatch() {
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

/**
 * Handle Package Preview Modal
 */
export function handleOpenPackagePreview() {
  const modal = document.getElementById('preview-modal');
  const body = document.getElementById('preview-modal-body');
  if (!modal || !body) return;

  const state = store.getState();
  const compliance = evaluateCompliance(state);
  const { orderedRequirements } = { orderedRequirements: state.requirements };
  const includeIndex = state.options.includeIndexPage;

  let totalPages = 1 + (includeIndex ? 1 : 0); // Cover + Index
  let runningStartPage = totalPages + 1;

  let rowsHtml = '';
  rowsHtml += `
    <tr>
      <td>1</td>
      <td><strong>Official Cover Page</strong></td>
      <td>Generated in-browser (English)</td>
      <td>1</td>
      <td>Page 1</td>
    </tr>
  `;

  if (includeIndex) {
    rowsHtml += `
      <tr>
        <td>2</td>
        <td><strong>Table of Contents / Index Page</strong></td>
        <td>Generated in-browser</td>
        <td>1</td>
        <td>Page 2</td>
      </tr>
    `;
  }

  for (const req of orderedRequirements) {
    const statusData = compliance.statusMap.get(req.id);
    if (statusData && statusData.matchedFile) {
      const file = statusData.matchedFile;
      const endPage = runningStartPage + file.pageCount - 1;
      const span = (file.pageCount > 1) ? `pp. ${runningStartPage} - ${endPage}` : `p. ${runningStartPage}`;

      rowsHtml += `
        <tr>
          <td>${req.order}</td>
          <td>${req.title_en}</td>
          <td>${file.filename}</td>
          <td>${file.pageCount}</td>
          <td><strong>${span}</strong></td>
        </tr>
      `;

      totalPages += file.pageCount;
      runningStartPage += file.pageCount;
    }
  }

  body.innerHTML = `
    <div style="font-size:0.9rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; background:var(--color-surface-alt); padding:0.75rem 1rem; border-radius:var(--radius-md);">
      <div>Total Expected Documents: <strong>${compliance.metrics.ok}</strong></div>
      <div>Total Package Pages: <strong>${totalPages} pages</strong></div>
    </div>
    <div style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:left;">
        <thead>
          <tr style="border-bottom:2px solid var(--color-border); background:var(--color-surface-alt);">
            <th style="padding:0.6rem;">Order</th>
            <th style="padding:0.6rem;">Document Title</th>
            <th style="padding:0.6rem;">File Name</th>
            <th style="padding:0.6rem;">Pages</th>
            <th style="padding:0.6rem;">Pagination</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;

  modal.classList.add('is-open');
}

/**
 * Handle CSV Checklist Export
 */
export function handleExportChecklistCsv() {
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

/**
 * Handle Project Save (JSON)
 */
export function handleSaveProject() {
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

/**
 * Handle Project Open
 */
export async function handleOpenProjectFile(file) {
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

/**
 * Handle Real Package Generation & Assembly
 */
export async function handleGeneratePackage() {
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

    // Initiate download: <tender_id>_Package.pdf
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
