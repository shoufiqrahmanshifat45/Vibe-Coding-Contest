/**
 * TenderFlow — Application Bootstrapper & Main Entrypoint
 */

import { store } from './state.js';
import { setLang, getLang } from './i18n.js';
import {
  renderApp,
  showToast,
  handleFilesSelected,
  handleRequirementsJsonUpload,
  handleOpenAutoMatch,
  handleOpenPackagePreview,
  handleExportChecklistCsv,
  handleSaveProject,
  handleOpenProjectFile,
  handleGeneratePackage,
  loadPresetTender
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize store subscriber for reactive rendering
  store.subscribe(() => {
    renderApp();
  });

  // 2. Setup Language Switcher
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.dataset.lang;
      setLang(selectedLang);
      renderApp();
    });
  });

  // 3. Setup Requirements File Input
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

  // 4. Setup Presets Dropdown & Sample Download
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
      import('./sample-data.js').then(module => {
        module.downloadSampleRequirementsJson('standard_ict');
      });
    });
  }

  // 5. Setup Drag-and-Drop and PDF File Picker
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

  // 6. Setup Clear All Files
  const btnClearFiles = document.getElementById('btn-clear-files');
  if (btnClearFiles) {
    btnClearFiles.addEventListener('click', () => {
      if (confirm("Are you sure you want to remove all uploaded PDFs?")) {
        store.clearFiles();
      }
    });
  }

  // 7. Setup Metric Filter Pills
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

  // 8. Setup Auto-Match Button
  const btnAutoMatch = document.getElementById('btn-auto-match');
  if (btnAutoMatch) {
    btnAutoMatch.addEventListener('click', handleOpenAutoMatch);
  }

  // 9. Setup Preview Package
  const btnPreview = document.getElementById('btn-preview-package');
  if (btnPreview) {
    btnPreview.addEventListener('click', handleOpenPackagePreview);
  }

  // 10. Setup Generate Package
  const btnGenerate = document.getElementById('btn-generate-package');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', handleGeneratePackage);
  }

  // 11. Setup Checklist Export CSV
  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', handleExportChecklistCsv);
  }

  // 12. Setup Save & Reopen Project
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

  // 13. Package Options (Index page toggle & Signature Stamp)
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

  // 14. Setup Help / Instructions Modal
  const btnHelp = document.getElementById('btn-open-help');
  const helpModal = document.getElementById('help-modal');
  if (btnHelp && helpModal) {
    btnHelp.addEventListener('click', () => helpModal.classList.add('is-open'));
  }

  // Close modals on clicking close buttons or backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('is-open');
    });
    backdrop.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => backdrop.classList.remove('is-open'));
    });
  });

  // Initial render (starts with clean empty state, ready for unseen requirements.json)
  renderApp();
});
