/**
 * TenderFlow — User Interface Component & Event Management
 */

import { store } from './state.js';
import { t, getLang, setLang } from './i18n.js';
import { evaluateCompliance, STATUS_TYPES } from './status-engine.js';
import { generateAutoMatchSuggestions, checkDuplicateConflict } from './matcher.js';
import { inspectPdfFile, assembleTenderPackage, downloadPackagePdf } from './pdf-engine.js';
import { SAMPLE_TENDERS, downloadSampleRequirementsJson, generateDemoPdfFiles } from './sample-data.js';

let lastGeneratedBlobUrl = null;
let lastGeneratedBytes = null;
let lastGeneratedFilename = null;

/**
 * Format bytes to human readable string (KB, MB)
 */
function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
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

/**
 * Render Tender Hero Overview
 */
export function renderTenderOverview() {
  const state = store.getState();
  const tender = state.tender;
  const card = document.querySelector('.tender-hero-card');
  if (!card) return;

  if (!tender) {
    // Empty State before requirements are loaded (Contest Section 26)
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

  // Active Tender state
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

/**
 * Render Validation Metrics Dashboard (Phase 11)
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

  document.querySelectorAll('.metric-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === activeFilter);
  });

  const clearHint = document.getElementById('filter-clear-hint');
  if (clearHint) {
    clearHint.style.display = (activeFilter !== 'all') ? 'flex' : 'none';
  }
}

/**
 * Render Actionable Blocking Issues Alert Banner (Phase 12)
 */
export function renderBlockingBanner(compliance) {
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

    // Bind Jump & Resolve buttons
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

/**
 * Render Requirements Checklist Rows
 */
export function renderRequirementsList(compliance) {
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

  // Pre-calculate which content hashes are already in use
  const fileMap = new Map(uploadedFiles.map(f => [f.id, f]));
  const matchedHashesToReq = new Map(); // hash -> reqId
  for (const [rId, fId] of Object.entries(matches)) {
    const f = fileMap.get(fId);
    if (f && f.contentHash) {
      matchedHashesToReq.set(f.contentHash, rId);
    }
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

    // Build select dropdown options
    let selectOptionsHtml = `<option value="">${t('selectFilePlaceholder')}</option>`;
    for (const file of uploadedFiles) {
      if (file.processingError) continue; // skip corrupted files

      const isCurrentMatch = (file.id === matchedFileId);

      // Check if file itself is already matched elsewhere
      let inUseElsewhereReqId = null;
      for (const [rId, fId] of Object.entries(matches)) {
        if (fId === file.id && rId !== req.id) {
          inUseElsewhereReqId = rId;
          break;
        }
      }

      // Check if this file is a duplicate of a file that is already matched to another requirement
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

  // Bind dropdown change events
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

      // Strict Duplicate Match Prevention (Contest Phase 4, TEST 8)
      const dupConflict = checkDuplicateConflict(selectedFile, reqId, state);
      if (dupConflict) {
        alert(`Duplicate Match Prevented:\n\nThis file has identical binary content to "${dupConflict.conflictingFileName}", which is already assigned to Requirement #${dupConflict.conflictingOrder} (${dupConflict.conflictingReqTitle}).\n\nUnder contest integrity rules, duplicate files cannot fulfill separate requirements.`);
        // Revert selection
        e.target.value = state.matches[reqId] || '';
        return;
      }

      store.setMatch(reqId, fileId);
    });
  });

  // Bind unmatch buttons
  container.querySelectorAll('.req-unmatch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reqId = e.currentTarget.dataset.reqId;
      store.unmatch(reqId);
    });
  });

  // Bind expiry inputs
  container.querySelectorAll('.req-expiry-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const reqId = e.target.dataset.reqId;
      const dateVal = e.target.value;
      store.setExpiryDate(reqId, dateVal);
    });
  });
}

/**
 * Render PDF File Library (Phase 13)
 */
export function renderFileLibrary() {
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

    // Build Quick Match options for this file card
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

  // Bind remove buttons
  container.querySelectorAll('.remove-file-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const fileId = e.currentTarget.dataset.fileId;
      store.removeFile(fileId);
    });
  });

  // Bind quick match from file library
  container.querySelectorAll('.file-quick-match-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const fileId = e.target.dataset.fileId;
      const targetReqId = e.target.value;
      const state = store.getState();
      const file = state.uploadedFiles.find(f => f.id === fileId);

      if (!targetReqId) {
        // Unmatch this file if matched
        for (const [rId, fId] of Object.entries(state.matches)) {
          if (fId === fileId) store.unmatch(rId);
        }
        return;
      }

      // Check duplicate restriction
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

/**
 * Render Package Generation & Action Bar
 */
export function renderActionBar(compliance) {
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
    // Reject non-PDFs (Contest Section 6)
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

/**
 * Updates duplicate flags across all uploaded files based on binary contentHash
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
  showToast("Generating realistic multi-page test PDFs in browser...", "info");
  try {
    const demoFiles = await generateDemoPdfFiles();
    await handleFilesSelected(demoFiles);
  } catch (err) {
    console.error("Demo files error:", err);
    showToast("Failed to generate test PDFs: " + err.message, "error");
  }
}

/**
 * Load Preset Tender requirements
 */
export function loadPresetTender(presetKey = 'standard_ict') {
  const preset = SAMPLE_TENDERS[presetKey] || SAMPLE_TENDERS.standard_ict;
  store.loadTenderSpecification(preset.tender, preset.requirements);
  showToast(`Loaded "${preset.tender.title}" (${preset.requirements.length} requirements)`, 'success');
}

/**
 * Parse and validate requirements.json file (Contest Section 5)
 */
export async function handleRequirementsJsonUpload(file) {
  try {
    const text = await file.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      alert("Invalid requirements.json file: File contains malformed JSON syntax. Please check the JSON format.");
      return;
    }

    // 1. Check tender object
    if (!json.tender || typeof json.tender !== 'object') {
      alert("Invalid requirements.json: Top-level 'tender' object is missing.");
      return;
    }

    const { tender, requirements } = json;
    if (!tender.tender_id || !tender.title || !tender.procuring_entity || !tender.bidder || !tender.submission_deadline) {
      alert("Invalid requirements.json: Tender information is missing required fields (tender_id, title, procuring_entity, bidder, or submission_deadline).");
      return;
    }

    // 2. Check requirements array
    if (!Array.isArray(requirements) || requirements.length === 0) {
      alert("Invalid requirements.json: 'requirements' array is missing or empty.");
      return;
    }

    // 3. Check each requirement item
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

/**
 * Handle Auto-Match Suggestions (Phase 13)
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

/**
 * Handle Package Preview Modal
 */
export function handleOpenPackagePreview() {
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

/**
 * Handle CSV Checklist Export
 */
export function handleExportChecklistCsv() {
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
  a.download = `${state.tender?.tender_id || "Tender"}_Project.tenderflow.json`;
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

/**
 * Handle Real Package Generation & Assembly (Phase 15)
 */
export async function handleGeneratePackage() {
  const state = store.getState();
  const compliance = evaluateCompliance(state);

  if (!compliance.canGenerate) {
    showToast(t('blockingTitle'), "error");
    return;
  }

  const modal = document.getElementById('gen-progress-modal');
  const card = modal?.querySelector('.modal-card');
  if (!modal || !card) return;

  // Set processing state
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

    // Trigger auto-download
    downloadPackagePdf(pdfBytes, state.tender?.tender_id);

    // Transition to Phase 15 Success Screen
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
