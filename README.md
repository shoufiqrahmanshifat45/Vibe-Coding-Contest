# TenderFlow — Intelligent Tender Package Builder

> **AI DevFest Vibe Coding Contest Submission**  
> *Turn tender documents into an official, submission-ready PDF package — 100% in your browser.*

---

## 🌟 Executive Summary

**TenderFlow** is a client-side, zero-backend web application engineered for procurement officers and tender bidding teams. It automates the verification, compliance auditing, duplicate detection, and assembly of complex tender packages.

### 🛡️ Privacy & Compliance Guarantee
- **100% Client-Side Processing**: No PDF bytes or metadata are ever transmitted to any remote server, database, or external API.
- **Auditable & Secure**: Operates directly in modern Google Chrome using standard web APIs (Web Crypto API, WebAssembly, and pdf-lib).

---

## 🚀 Key Features

| Category | Capability | Technical Implementation |
| :--- | :--- | :--- |
| **Requirements Parsing** | Dynamic JSON ingestion & validation | Validates structure, sorts by `order`, calculates deadline proximity |
| **PDF Processing** | Multi-file upload (up to 30 files, 50 MB) | Reads real page counts, safely catches corrupt/encrypted files |
| **Duplicate Detection** | Binary cryptographic deduplication | Computes SHA-256 hash of binary ArrayBuffer (not filename) |
| **Status Engine** | Strict 5-state validation | Evaluates `Missing`, `Expiry needed`, `Expired`, `Not provided`, `OK` |
| **Duplicate Restriction** | Integrity constraint enforcement | Prevents identical duplicate PDFs from fulfilling multiple requirements |
| **Package Generation** | Assembles final submission PDF | Real PDF generation via `pdf-lib` in browser memory |
| **Cover Page** | Official English tender cover sheet | Tender Ref, Title, Procuring Entity, Bidder, Deadline, Enclosed Schedule |
| **Table of Contents** | Dynamic Index page (Bonus 1) | Computes accurate starting page numbers for each document |
| **Pagination Footers** | Uniform footer on all pages | Stamped as `<tender_id> \| Page X of Y` across entire document |
| **Digital Seal/Signature** | PNG placement tool (Bonus 5) | Embeds transparent PNG stamp on Cover or Last page |
| **Auto-Match Suggestions**| Filename similarity engine (Bonus 2) | Fuzzy token and Levenshtein-based matching recommendations |
| **Checklist Export** | Audit report (Bonus 3) | 1-click CSV download with UTF-8 BOM encoding |
| **Project Persistence** | Save / Reopen project (Bonus 4) | In-browser project state JSON export & re-import |
| **Bilingual UI** | English & Bengali (বাংলা) | Seamless language switching with native script rendering |

---

## 🏗️ Architecture & Core Engines

### 1. Document Status & Validation Engine (`js/status-engine.js`)
Every tender requirement is evaluated in real-time through a centralized deterministic state machine:

1. **`Missing`** (Blocking): `mandatory === true` AND no PDF matched.
2. **`Expiry date needed`** (Blocking): `has_expiry === true` AND PDF matched AND no expiry date entered.
3. **`Expired`** (Blocking): `has_expiry === true` AND `expiry_date < submission_deadline`.
4. **`Not provided`** (Non-blocking): `mandatory === false` AND no PDF matched.
5. **`OK`** (Non-blocking): PDF matched; if `has_expiry === true`, then `expiry_date >= submission_deadline` *(including exact equality)*.

**Duplicate Matching Constraint**: If two different requirements are matched to files with identical binary hashes, a blocking collision is flagged.

### 2. PDF Assembly Engine (`js/pdf-engine.js`)
- **Page 1 (Cover Page)**: Standard English cover page containing complete procurement metadata, submission schedule table, and sign-off block.
- **Page 2 (Document Index)**: Dynamically generated Table of Contents calculating exact starting page numbers based on preceding documents.
- **Pages 3+ (Document Bodies)**: Copies all pages from source PDFs in strict `order` sequence while preserving internal page ordering. Unmatched optional documents are skipped.
- **Page Footers**: Loops over all assembled pages ($1 \dots Y$) and stamps `<tender_id> | Page X of Y` centered at bottom margin with a subtle dividing rule.
- **Download Naming**: Output file is strictly named `<tender_id>_Package.pdf` (e.g., `T-2026-0417_Package.pdf`).

---

## 💻 How to Run Locally

### Option A: Direct Open (Zero Setup)
Simply double-click or open [index.html](file:///c:/Vibe%20Coding%20Contest/index.html) directly in **Google Chrome**:
```
c:\Vibe Coding Contest\index.html
```
*(TenderFlow includes a universal bundle `js/bundle.js` designed to work over `file:///` without CORS module errors).*

### Option B: Local Web Server (Recommended)
Using Python:
```bash
cd "c:\Vibe Coding Contest"
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

Using Node `npx serve`:
```bash
npx serve "c:\Vibe Coding Contest"
```

---

## 🌐 Public Deployment Instructions

Deploying TenderFlow is instantaneous because it is 100% static:

### GitHub Pages
1. Push this repository to GitHub.
2. Navigate to **Settings** > **Pages**.
3. Select `Branch: main` and `/ (root)`, then click **Save**.

### Netlify / Vercel
- **Build command**: *(none needed)*
- **Publish directory**: `.` (root)

---

## 🧪 Verification & Testing Matrix

| Test Scenario | Action | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **TEST 1** | All required documents valid | Generate button enabled, ready banner displays | ✅ Verified |
| **TEST 2** | Mandatory document unmatched | Status = `Missing`, blocking = YES, Generate disabled | ✅ Verified |
| **TEST 3** | Matched document with missing expiry | Status = `Expiry date needed`, blocking = YES | ✅ Verified |
| **TEST 4** | Expiry date < submission deadline | Status = `Expired`, blocking = YES | ✅ Verified |
| **TEST 5** | Expiry date == submission deadline | Status = `OK`, non-blocking | ✅ Verified |
| **TEST 6** | Optional document unmatched | Status = `Not provided`, non-blocking | ✅ Verified |
| **TEST 7** | Two identical PDFs with different names | Detected via SHA-256 binary hash, marked as DUPLICATE | ✅ Verified |
| **TEST 8** | Match duplicate file to two requirements | Blocked / flagged as duplicate collision | ✅ Verified |
| **TEST 9** | Upload non-PDF file | Rejected with error: `"Only PDF files are allowed."` | ✅ Verified |
| **TEST 10** | Upload > 30 PDFs | Safely rejected with limit warning | ✅ Verified |
| **TEST 11** | Total upload size > 50 MB | Safely rejected with limit warning | ✅ Verified |
| **TEST 12** | Generate final package | Cover, Index, correct document order, footer `Page X of Y`, named `<tender_id>_Package.pdf` | ✅ Verified |
| **TEST 13** | Switch English / Bangla | Entire UI language toggles without state loss | ✅ Verified |
| **TEST 14** | Load unseen `requirements.json` | Reconfigures application dynamically without errors | ✅ Verified |
