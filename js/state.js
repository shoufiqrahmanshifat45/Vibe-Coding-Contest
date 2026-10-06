/**
 * TenderFlow — Central State Management Store
 * Reactive state store with event listeners
 */

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
        signaturePlacement: 'cover-bottom-right', // 'cover-bottom-right', 'cover-bottom-left', 'last-bottom-right'
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
    // Requirements must be sorted by order
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
    // Unmatch if file is currently matched
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
      // 1-to-1 enforcement: remove this file from any other requirement
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

  setGenerating(isGenerating) {
    this.state.isGenerating = isGenerating;
    this.notify();
  }

  resetAll() {
    this.state.uploadedFiles = [];
    this.state.matches = {};
    this.state.expiries = {};
    this.state.activeFilter = 'all';
    this.notify();
  }
}

export const store = new Store();
