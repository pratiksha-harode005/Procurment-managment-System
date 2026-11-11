const path = require('path');
const fs = require('fs');

const { jsPDF } = require('jspdf');
const autoTable = require('jspdf-autotable');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 15;
const contentWidth = pageWidth - (margin * 2); // 180mm

// ==========================================
// PAGE 1: COVER PAGE (DARK MIDNIGHT THEME)
// ==========================================
// Deep midnight background
doc.setFillColor(8, 23, 40);
doc.rect(0, 0, pageWidth, pageHeight, 'F');

// Top Pill Badge
doc.setDrawColor(56, 189, 248);
doc.setFillColor(12, 38, 64);
doc.roundedRect(margin, 20, 160, 8, 4, 4, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(56, 189, 248);
doc.text('KSS ENTERPRISE SYSTEMS • SUPPLY CHAIN & PROCUREMENT DIVISION', margin + 6, 25.3);

// Main Title
doc.setFont('helvetica', 'bold');
doc.setFontSize(32);
doc.setTextColor(255, 255, 255);
doc.text('KSS Procurement', margin, 46);
doc.text('Operating System', margin, 58);

// Subtitle
doc.setFont('helvetica', 'normal');
doc.setFontSize(10.5);
doc.setTextColor(148, 163, 184);
const subtitle = 'A Next-Generation Enterprise Procurement Operating System Featuring 5-Tier RBAC, Automated Approval Hierarchies, Real-Time Multi-Stage Stepper Tracking & Comprehensive Three-Way Matching Governance.';
doc.text(subtitle, margin, 70, { maxWidth: contentWidth, lineHeightFactor: 1.4 });

// Tech Badges
const badges = [
  'React 18 & Vite 5',
  'Python & Django REST Framework',
  'Relational PostgreSQL / SQLite',
  'IDOR & RBAC Security',
  'Tailwind CSS & Lucide Icons'
];

let badgeX = margin;
let badgeY = 93;
doc.setFontSize(8);
doc.setFont('helvetica', 'bold');
badges.forEach((b) => {
  const textWidth = doc.getTextWidth(b);
  const pillW = textWidth + 8;
  if (badgeX + pillW > margin + contentWidth) {
    badgeX = margin;
    badgeY += 9;
  }
  doc.setDrawColor(51, 65, 85);
  doc.setFillColor(15, 31, 51);
  doc.roundedRect(badgeX, badgeY - 5, pillW, 7, 2, 2, 'FD');
  doc.setTextColor(226, 232, 240);
  doc.text(b, badgeX + 4, badgeY - 0.5);
  badgeX += pillW + 5;
});

// 4 Stats Cards
const statY = 135;
const cardW = (contentWidth - 9) / 4; // ~42.75mm
const stats = [
  { val: '8+', lbl: 'PROCUREMENT\nMODULES' },
  { val: '5 Roles', lbl: 'ACCESS\nCONTROL' },
  { val: '100%', lbl: 'AUDIT &\nCOMPLIANCE' },
  { val: '<24h', lbl: 'APPROVAL\nTURNAROUND' }
];

stats.forEach((s, i) => {
  const cx = margin + i * (cardW + 3);
  doc.setDrawColor(30, 58, 95);
  doc.setFillColor(11, 28, 48);
  doc.roundedRect(cx, statY, cardW, 32, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(56, 189, 248);
  doc.text(s.val, cx + cardW / 2, statY + 12, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(s.lbl, cx + cardW / 2, statY + 20, { align: 'center', lineHeightFactor: 1.2 });
});

// Bottom Metadata Box
const metaY = 195;
doc.setDrawColor(30, 58, 95);
doc.setFillColor(9, 24, 42);
doc.roundedRect(margin, metaY, contentWidth, 75, 4, 4, 'FD');

const colHalf = contentWidth / 2;

// Item 1
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(56, 189, 248);
doc.text('PROJECT TITLE', margin + 8, metaY + 12);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(255, 255, 255);
doc.text('KSS Procurement OS (Enterprise Procurement System)', margin + 8, metaY + 19, { maxWidth: colHalf - 12 });

// Item 2
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(56, 189, 248);
doc.text('TARGET STAKEHOLDERS', margin + colHalf + 4, metaY + 12);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(255, 255, 255);
doc.text('Team Leads, Department Managers, Finance Controllers, IT Admins, Vendors', margin + colHalf + 4, metaY + 19, { maxWidth: colHalf - 12 });

// Item 3
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(56, 189, 248);
doc.text('DOMAIN', margin + 8, metaY + 46);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(255, 255, 255);
doc.text('Enterprise Supply Chain, B2B Sourcing, Financial Governance & ERP Automation', margin + 8, metaY + 53, { maxWidth: colHalf - 12 });

// Item 4
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(56, 189, 248);
doc.text('DOCUMENT TYPE & YEAR', margin + colHalf + 4, metaY + 46);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(255, 255, 255);
doc.text('Comprehensive Academic & Technical Project Report • FY 2026', margin + colHalf + 4, metaY + 53, { maxWidth: colHalf - 12 });


// ==========================================
// HELPER FOR INNER PAGES (2 to 6)
// ==========================================
function drawInnerHeader(doc, sectionText) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('KSS PROCUREMENT OPERATING SYSTEM', margin, 14);

  doc.setTextColor(2, 132, 199);
  doc.text(sectionText, pageWidth - margin, 14, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, 17, pageWidth - margin, 17);
}

function drawSectionHeading(doc, title, y) {
  doc.setFillColor(2, 132, 199);
  doc.rect(margin, y - 4.5, 2.5, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(15, 23, 42);
  doc.text(title, margin + 5, y);
}


// ==========================================
// PAGE 2: SECTION 1 & 2: OVERVIEW & PROBLEMS
// ==========================================
doc.addPage();
drawInnerHeader(doc, 'SECTION 1 & 2: OVERVIEW & PROBLEMS');

// 1. Executive Summary
drawSectionHeading(doc, '1. Executive Summary', 26);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(51, 65, 85);
const execText = 'The KSS Procurement OS is a full-stack enterprise web application designed to eliminate paper-bound requisition bottlenecks, opaque quotation bidding, rogue spending, and lack of accountability in corporate procurement workflows. Operating as a unified single-window digital interface for enterprise supply chain operations, it connects department team leads directly with authorized managers, finance controllers, executive administrators, and registered external vendors.';
doc.text(execText, margin, 32, { maxWidth: contentWidth, lineHeightFactor: 1.4 });

// Page 2 Stat Cards
const p2StatY = 52;
const p2Stats = [
  { num: '8+', lbl: 'PROCUREMENT MODULES' },
  { num: '5', lbl: 'USER PERSONAS' },
  { num: '100%', lbl: 'AUDIT TRAIL' },
  { num: '0 s', lbl: 'ROUTING DELAY' }
];

p2Stats.forEach((s, i) => {
  const cx = margin + i * (cardW + 3);
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(cx, p2StatY, cardW, 20, 2, 2, 'FD');

  doc.setFillColor(2, 132, 199);
  doc.rect(cx, p2StatY, cardW, 1.2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(s.num, cx + cardW / 2, p2StatY + 9.5, { align: 'center' });

  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text(s.lbl, cx + cardW / 2, p2StatY + 15, { align: 'center' });
});

// 2. Problem Formulation & Modern Solution Matrix
drawSectionHeading(doc, '2. Problem Formulation & Modern Solution Matrix', 84);

const p2TableData = [
  [
    'Manual Paper Requisitions',
    'Department employees spend days drafting paper purchase slips, chasing physical signatures, and navigating long approval queues.',
    '24/7 Digital Self-Service with multi-step interactive forms, automated category taxonomy, and instant tracking reference receipts.'
  ],
  [
    'Opaque Vendor Bidding',
    'Unstandardized quotation exchanges via email lead to supplier favoritism, bid tampering, and inflated unit procurement costs.',
    'Encrypted RFQ Sourcing Portal with sealed multi-vendor bid submissions, automated tax calculations (GST), and transparent matrices.'
  ],
  [
    'Unverified Invoices & Spend',
    'Finance teams process invoices for unreceived, damaged, or mispriced items with no programmatic reconciliation against purchase orders.',
    'Strict Three-Way Matching Engine reconciling Purchase Order (PO), Goods Receipt Note (GRN), and Vendor Invoice before payout.'
  ],
  [
    'Disjointed Audit Silos',
    'Approvals lack transparent audit trails, leaving auditors unable to verify who approved cost adjustments, when, or under what justification.',
    'Immutable StatusHistory Audit Logs recording exact timestamps, user roles, cost-center snapshots, and mandatory remarks.'
  ]
];

autoTable.default(doc, {
  startY: 89,
  margin: { left: margin, right: margin },
  head: [['Traditional Pain Point', 'Real-World Impact', 'Digital System Solution']],
  body: p2TableData,
  theme: 'plain',
  headStyles: {
    fillColor: [12, 35, 64],
    textColor: [255, 255, 255],
    fontSize: 8.5,
    fontStyle: 'bold',
    cellPadding: 3
  },
  bodyStyles: {
    fontSize: 8,
    textColor: [51, 65, 85],
    cellPadding: 3,
    lineHeightFactor: 1.3
  },
  columnStyles: {
    0: { cellWidth: 42, fontStyle: 'bold', textColor: [15, 23, 42] },
    1: { cellWidth: 68 },
    2: { cellWidth: 70 }
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252]
  }
});

// Key Innovation Callout
const p2CalloutY = doc.lastAutoTable.finalY + 12;
doc.setDrawColor(187, 247, 208);
doc.setFillColor(240, 253, 244);
doc.roundedRect(margin, p2CalloutY, contentWidth, 30, 2.5, 2.5, 'FD');

doc.setFillColor(22, 163, 74);
doc.rect(margin, p2CalloutY, 2.5, 30, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(22, 101, 52);
doc.text('Key Innovation:', margin + 6, p2CalloutY + 6.5);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(22, 101, 52);
const calloutDesc = 'The system features an Enterprise Multi-Portal Unified Architecture. It operates dynamically with the high-performance Django REST Framework API while maintaining seamless dual workflow branching for Flow A (Physical Hardware & Capital Assets) and Flow B (Software, Cloud Subscriptions & SaaS Licenses) with specialized justification lifecycles.';
doc.text(calloutDesc, margin + 6, p2CalloutY + 12, { maxWidth: contentWidth - 12, lineHeightFactor: 1.35 });


// ==========================================
// PAGE 3: SECTION 3 & 4: ARCHITECTURE & SECURITY
// ==========================================
doc.addPage();
drawInnerHeader(doc, 'SECTION 3: ARCHITECTURE & SECURITY');

// 3. System Architecture & Technical Stack
drawSectionHeading(doc, '3. System Architecture & Technical Stack', 26);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(51, 65, 85);
doc.text('The platform adopts a decoupled Client-Server architecture ensuring sub-second page transitions, responsive touch ergonomics, and enterprise-grade relational consistency.', margin, 32, { maxWidth: contentWidth });

// Architecture ASCII Diagram Box
const asciiY = 40;
doc.setFillColor(9, 23, 40);
doc.setDrawColor(30, 58, 95);
doc.roundedRect(margin, asciiY, contentWidth, 80, 2.5, 2.5, 'FD');

doc.setFont('courier', 'normal');
doc.setFontSize(6.2);
doc.setTextColor(125, 211, 252);

const asciiLines = [
  "+------------------------------------------------------------------------------------+",
  "|                                   CLIENT LAYER                                     |",
  "| +--------------------+ +--------------------+ +--------------------+ +-----------+ |",
  "| |  Team Lead Portal  | |   Manager Portal   | |   Finance Portal   | |   Vendor  | |",
  "| |   & Requisitions   | |    & Approvals     | |  & 3-Way Matching  | |  & Bids   | |",
  "| +--------------------+ +--------------------+ +--------------------+ +-----------+ |",
  "| +--------------------------------------------------------------------------------+ |",
  "| | React 18 (Vite) SPA | TypeScript | Tailwind CSS Tokens | Lucide Icon Suite     | |",
  "| +--------------------------------------------------------------------------------+ |",
  "+-----------------------------------------|------------------------------------------+",
  "                                          | REST API (JSON / HTTPS & Bearer JWT)",
  "                                          v",
  "+------------------------------------------------------------------------------------+",
  "|                                 BACKEND API LAYER                                  |",
  "| +--------------------------------------------------------------------------------+ |",
  "| |                 Python 3.10+ / Django 4.2+ REST Framework                      | |",
  "| | - Automated Tiered Routing Engine     - Insecure Direct Object (IDOR) Guard    | |",
  "| | - Role-Based Access Control (RBAC)    - Immutable Status History & Audit Trail | |",
  "| | - Three-Way Matching Engine (PO/GRN)  - Dynamic Budget Allocation Controller   | |",
  "| +--------------------------------------------------------------------------------+ |",
  "+-----------------------------------------|------------------------------------------+",
  "                                          | ORM Data Bindings",
  "                                          v",
  "+------------------------------------------------------------------------------------+",
  "|                                  DATABASE LAYER                                    |",
  "| +------------------------------------+ +-----------------------------------------+|",
  "| | Relational DB (PostgreSQL/SQLite)  | | Secure Media & Document Store            ||",
  "| | Users, Requests, RFQs, Orders, Logs| | Encrypted Invoices, Quotes, Receipts, POD||",
  "| +------------------------------------+ +-----------------------------------------+|",
  "+------------------------------------------------------------------------------------+"
];

let currAsciiY = asciiY + 5;
asciiLines.forEach(line => {
  doc.text(line, margin + 3.5, currAsciiY);
  currAsciiY += 3.15;
});

// 4. 5-Tier Role-Based Access Control (RBAC)
drawSectionHeading(doc, '4. 5-Tier Role-Based Access Control (RBAC)', 132);

const rbacData = [
  [
    'Team Lead',
    'Department Leads & Requisitioners',
    'Submit purchase requests (Flow A Hardware / Flow B SaaS), attach technical specifications, track live 4-stage stepper, execute mock payments, submit payment justification documents (IDOR Protected).'
  ],
  [
    'Manager',
    'Department Heads & Budget Custodians',
    'Conduct market research & pre-estimation, review department request queue, approve/reject requests with mandatory remarks, track department budget limits, raise RFQs, verify goods receipts.'
  ],
  [
    'Finance',
    'Financial Officers & Controllers',
    'Company-wide budget oversight, cost estimation validation, verify 3-Way Match (PO, Goods Receipt, Vendor Invoice), execute disbursement (NEFT/RTGS/Card), generate audit reports.'
  ],
  [
    'Vendor',
    'External Suppliers & Contractors',
    'Inspect invited RFQs, submit sealed itemized quotations (Base Price + GST), review issued Purchase Orders, acknowledge dispatch dates, and upload digital tax invoices.'
  ],
  [
    'Super Admin',
    'Procurement Directors & IT Admins',
    'Master system control, department & user provisioning, role escalation, vendor KYC onboarding & category management, budget ceiling allocation, immutable security audit logs.'
  ]
];

autoTable.default(doc, {
  startY: 137,
  margin: { left: margin, right: margin },
  head: [['Role', 'Target Persona', 'Authorized Actions & Feature Isolation']],
  body: rbacData,
  theme: 'plain',
  headStyles: {
    fillColor: [12, 35, 64],
    textColor: [255, 255, 255],
    fontSize: 8.5,
    fontStyle: 'bold',
    cellPadding: 3
  },
  bodyStyles: {
    fontSize: 7.8,
    textColor: [51, 65, 85],
    cellPadding: 3,
    lineHeightFactor: 1.3
  },
  columnStyles: {
    0: { cellWidth: 26, fontStyle: 'bold', textColor: [2, 132, 199] },
    1: { cellWidth: 44, fontStyle: 'bold', textColor: [15, 23, 42] },
    2: { cellWidth: 110 }
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252]
  }
});


// ==========================================
// PAGE 4: SECTION 4 & 5: SERVICES & WORKFLOWS
// ==========================================
doc.addPage();
drawInnerHeader(doc, 'SECTION 4 & 5: SERVICES & WORKFLOWS');

// 5. Comprehensive Procurement Services Suite
drawSectionHeading(doc, '5. Comprehensive Procurement Services Suite', 26);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
doc.text('The platform provides digital workflows across 10 vital procurement and supply chain modules:', margin, 31);

const servicesData = [
  ['1. Purchase Requisition (PR)', 'Request Management', '24 Hours', 'Department user uploads technical specifications and justification; auto-routed to Manager active queue.'],
  ['2. Pre-Estimation & Research', 'Manager Operations', '48 Hours', 'Manager evaluates market alternatives, renewal vs upgrade costs, and records approved price ceilings.'],
  ['3. Request for Quotation (RFQ)', 'Sourcing & Bidding', '3 Days', 'Competitive bidding initiated; invited vendors receive notifications and submit itemized quotes with tax breakdowns.'],
  ['4. Quotation Evaluation', 'Vendor Management', '24 Hours', 'Multi-vendor bid comparison matrix; system enforces single selected vendor rule with audit rationale.'],
  ['5. Purchase Order (PO)', 'Procurement Execution', 'Instant', 'Automated PO generation with unique cryptographic PO reference (PO-XXXX), terms, and vendor dispatch.'],
  ['6. Goods Receipt Note (GRN)', 'Warehouse / Logistics', '24 Hours', 'Physical delivery logged with ordered vs received quantity check, damage reporting, and receipt verification timestamp.'],
  ['7. Vendor Invoice Verification', 'Invoice Management', '48 Hours', 'Vendor uploads digital invoice (INV-XXXX) with tax breakdown; system flags for Three-Way Matching.'],
  ['8. Three-Way Matching', 'Finance & Audit', 'Instant', 'Automated reconciliation of Purchase Order, Goods Receipt, and Invoice amounts to eliminate discrepancy and over-billing.'],
  ['9. Payment Disbursement', 'Finance & Treasury', 'Instant', 'Payment execution via NEFT/RTGS/UPI or simulated corporate disbursement; transaction reference logged.'],
  ['10. Department Budget Lock', 'Budget Management', 'Instant', 'Real-time budget limit enforcement (Fiscal Year 2026) tracking committed vs spent funds per cost center.']
];

autoTable.default(doc, {
  startY: 35,
  margin: { left: margin, right: margin },
  head: [['Service Name', 'Department', 'SLA', 'Workflow Summary']],
  body: servicesData,
  theme: 'plain',
  headStyles: {
    fillColor: [12, 35, 64],
    textColor: [255, 255, 255],
    fontSize: 8,
    fontStyle: 'bold',
    cellPadding: 2.5
  },
  bodyStyles: {
    fontSize: 7.5,
    textColor: [51, 65, 85],
    cellPadding: 2.2,
    lineHeightFactor: 1.2
  },
  columnStyles: {
    0: { cellWidth: 44, fontStyle: 'bold', textColor: [15, 23, 42] },
    1: { cellWidth: 38 },
    2: { cellWidth: 20, fontStyle: 'bold' },
    3: { cellWidth: 78 }
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252]
  }
});

// 6. Citizen Request Lifecycle Stepper
const stepperY = doc.lastAutoTable.finalY + 12;
drawSectionHeading(doc, '6. Requisition Lifecycle State Stepper', stepperY);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
doc.text('Every procurement request traverses a 4-stage transparent state machine:', margin, stepperY + 6);

const stepCardY = stepperY + 11;
const stepCardW = (contentWidth - 9) / 4;
const steps = [
  { num: '1', title: 'Submitted', desc: 'Application created with\ntechnical specs & justification' },
  { num: '2', title: 'Dept Assigned', desc: 'Auto-routed to Dept Manager\nqueue for pre-estimation' },
  { num: '3', title: 'In Progress', desc: 'RFQ bidding, PO dispatch &\nphysical inspection active' },
  { num: '4', title: 'Resolved', desc: 'Three-Way Match verified,\npayment disbursed & closed' }
];

steps.forEach((st, i) => {
  const sx = margin + i * (stepCardW + 3);
  doc.setDrawColor(2, 132, 199);
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(sx, stepCardY, stepCardW, 36, 2.5, 2.5, 'FD');

  doc.setFillColor(2, 132, 199);
  doc.circle(sx + stepCardW / 2, stepCardY + 8, 4.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(st.num, sx + stepCardW / 2, stepCardY + 9.5, { align: 'center' });

  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(st.title, sx + stepCardW / 2, stepCardY + 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text(st.desc, sx + stepCardW / 2, stepCardY + 24, { align: 'center', lineHeightFactor: 1.25 });
});


// ==========================================
// PAGE 5: SECTION 6 & 7: DATA & APIS
// ==========================================
doc.addPage();
drawInnerHeader(doc, 'SECTION 6 & 7: DATA & APIS');

// 7. Database Schema & Entity Relationships
drawSectionHeading(doc, '7. Database Schema & Entity Relationships', 26);

const schemaData = [
  ['User', 'id (INT / UUID)', 'username, email (Unique), password (PBKDF2/SHA256), role (Enum), department (FK), phone, cost_center'],
  ['Department', 'id (INT)', 'name (Unique), code (Unique), description, created_at, updated_at'],
  ['PurchaseRequest', 'id / request_id (VARCHAR)', 'title, category, requested_amount, current_stage, status, flow_type (A/B), created_by (FK), department (FK)'],
  ['RFQ', 'id / rfq_id (VARCHAR)', 'title, deadline, status (Open/Closed), invited_vendors (M2M), purchase_request (FK)'],
  ['Quotation', 'id / quotation_id (VARCHAR)', 'rfq (FK), vendor (FK), price, gst_rate, tax_amount, total_amount, status (Enum), delivery_days'],
  ['PurchaseOrder', 'id / po_id (VARCHAR)', 'purchase_request (FK), quotation (FK), vendor (FK), total_amount, status, expected_delivery'],
  ['GoodsReceipt', 'id / receipt_id (VARCHAR)', 'purchase_order (FK), received_by (FK), ordered_quantity, received_quantity, status, verified_at'],
  ['Invoice', 'id / invoice_id (VARCHAR)', 'purchase_order (FK), vendor (FK), invoice_number, amount, tax_amount, status, is_manager_verified'],
  ['ThreeWayMatch', 'id / match_id (VARCHAR)', 'purchase_order (FK), goods_receipt (FK), invoice (FK), po_amount, invoice_amount, is_matched'],
  ['ApprovalHistory', 'id (UUID / INT)', 'request (FK), action, performed_by (FK), user_role, previous_status, new_status, comments, timestamp']
];

autoTable.default(doc, {
  startY: 31,
  margin: { left: margin, right: margin },
  head: [['Table Name', 'Primary Key', 'Key Attributes & Constraints']],
  body: schemaData,
  theme: 'plain',
  headStyles: {
    fillColor: [12, 35, 64],
    textColor: [255, 255, 255],
    fontSize: 8,
    fontStyle: 'bold',
    cellPadding: 2.5
  },
  bodyStyles: {
    fontSize: 7.5,
    textColor: [51, 65, 85],
    cellPadding: 2.2,
    lineHeightFactor: 1.25
  },
  columnStyles: {
    0: { cellWidth: 44, fontStyle: 'bold', textColor: [15, 23, 42] },
    1: { cellWidth: 34, fontStyle: 'bold' },
    2: { cellWidth: 102 }
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252]
  }
});

// 8. REST API Specifications & Endpoints
const apiY = doc.lastAutoTable.finalY + 14;
drawSectionHeading(doc, '8. REST API Specifications & Endpoints', apiY);

const apiData = [
  ['POST', '/api/auth/login/', 'Validates credentials; returns auth token & user profile.', 'Public'],
  ['POST', '/api/auth/register/', 'Registers new user with department and role assignment.', 'Public'],
  ['POST', '/api/team-lead/requests/', 'Submits new request; triggers auto-routing and manager queue assignment.', 'Team Lead'],
  ['GET', '/api/team-lead/requests/', "Fetches user's own submitted requests (IDOR protected).", 'Team Lead'],
  ['GET', '/api/manager/requests/', 'Returns assigned tickets for department manager queue.', 'Manager'],
  ['GET', '/api/finance/requests/', 'Returns complete company request queue for finance audit & oversight.', 'Finance'],
  ['POST', '/api/requests/{id}/approve/', 'Transitions request status, appends to ApprovalHistory, notifies stakeholders.', 'Manager / Finance']
];

autoTable.default(doc, {
  startY: apiY + 5,
  margin: { left: margin, right: margin },
  head: [['Method', 'Endpoint', 'Description', 'Access Guard']],
  body: apiData,
  theme: 'plain',
  headStyles: {
    fillColor: [12, 35, 64],
    textColor: [255, 255, 255],
    fontSize: 8,
    fontStyle: 'bold',
    cellPadding: 2.5
  },
  bodyStyles: {
    fontSize: 7.5,
    textColor: [51, 65, 85],
    cellPadding: 2.5,
    lineHeightFactor: 1.25
  },
  columnStyles: {
    0: { cellWidth: 18, fontStyle: 'bold', textColor: [2, 132, 199] },
    1: { cellWidth: 54, fontStyle: 'bold', textColor: [15, 23, 42] },
    2: { cellWidth: 84 },
    3: { cellWidth: 24, fontStyle: 'bold' }
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252]
  }
});


// ==========================================
// PAGE 6: SECTION 8 & 9: SECURITY & VIVA
// ==========================================
doc.addPage();
drawInnerHeader(doc, 'SECTION 8 & 9: SECURITY & VIVA');

// 9. Security Architecture & IDOR Guard
drawSectionHeading(doc, '9. Security Architecture & IDOR Guard', 26);

const secBoxY = 32;
doc.setDrawColor(186, 230, 253);
doc.setFillColor(240, 249, 255);
doc.roundedRect(margin, secBoxY, contentWidth, 38, 2.5, 2.5, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(2, 132, 199);
doc.text('Enterprise Security Implementations:', margin + 6, secBoxY + 7);

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.8);
doc.setTextColor(51, 65, 85);

const secPoints = [
  '•  IDOR Protection: Requisition and quotation API queries strictly filter by authenticated session token rather than user-supplied query parameters, preventing unauthorized viewing of other departments\' or vendors\' data.',
  '•  Immutable Audit Trails: Every status transition generates an append-only record in ApprovalHistory, preventing retrospective data tampering.',
  '•  Client-Side Role Guards: React ProtectedRoute verifies role permissions before mounting protected dashboard views.'
];

let currSecY = secBoxY + 14;
secPoints.forEach(pt => {
  doc.text(pt, margin + 6, currSecY, { maxWidth: contentWidth - 12, lineHeightFactor: 1.3 });
  currSecY += 7.5;
});

// 10. Viva Voce & Technical Defense Guide
drawSectionHeading(doc, '10. Viva Voce & Technical Defense Guide', 82);

const vivaData = [
  [
    'What is the core innovation of this project?',
    'Automated tiered procurement orchestration integrating 5-role RBAC, closed-loop 4-stage tracking stepper, sealed RFQ bidding, and automated Three-Way Matching with immutable audit trails.'
  ],
  [
    'How is Role-Based Access Control enforced?',
    'Dual-layer protection: React ProtectedRoute guards in the frontend and Django REST Framework permission classes at the API layer.'
  ],
  [
    'How does IDOR protection work in the API?',
    'The backend queries filter requests strictly using authenticated session email identity, preventing unauthorized access across departments and vendors.'
  ]
];

autoTable.default(doc, {
  startY: 87,
  margin: { left: margin, right: margin },
  head: [['Viva Question', 'Technical Answer']],
  body: vivaData,
  theme: 'plain',
  headStyles: {
    fillColor: [12, 35, 64],
    textColor: [255, 255, 255],
    fontSize: 8.5,
    fontStyle: 'bold',
    cellPadding: 3
  },
  bodyStyles: {
    fontSize: 8,
    textColor: [51, 65, 85],
    cellPadding: 3.5,
    lineHeightFactor: 1.3
  },
  columnStyles: {
    0: { cellWidth: 60, fontStyle: 'bold', textColor: [15, 23, 42] },
    1: { cellWidth: 120 }
  },
  alternateRowStyles: {
    fillColor: [248, 250, 252]
  }
});

// 11. Project Sign-Off & Evaluation Sheet
const signY = doc.lastAutoTable.finalY + 22;
drawSectionHeading(doc, '11. Project Sign-Off & Evaluation Sheet', signY);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(51, 65, 85);
doc.text('This report certifies that the KSS Procurement Operating System has been implemented, validated across all 5 user roles, and verified for production-grade enterprise procurement and governance standards.', margin, signY + 6, { maxWidth: contentWidth, lineHeightFactor: 1.3 });

// Dashed Signature Line
const lineY = signY + 24;
doc.setDrawColor(148, 163, 184);
doc.setLineDash([2, 2], 0);
doc.line(margin, lineY, pageWidth - margin, lineY);
doc.setLineDash([]); // Reset to solid

// Signatures text
const sigTextY = lineY + 6;

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(15, 23, 42);
doc.text('Candidate / Developer Signature', margin + 12, sigTextY);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(71, 85, 105);
doc.text('Pratiksha Harode • Procurement Systems Lead', margin + 12, sigTextY + 5);

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(15, 23, 42);
doc.text('Project Guide / Faculty Examiner', margin + colHalf + 12, sigTextY);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.setTextColor(71, 85, 105);
doc.text('Department of Computer Science & Engineering', margin + colHalf + 12, sigTextY + 5);

// ==========================================
// WRITE OUTPUT PDF FILE
// ==========================================
const outPath = path.join(__dirname, '..', 'PROJECT_REPORT_KSS_PROCUREMENT_OS.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outPath, pdfBuffer);
console.log('SUCCESSFULLY_GENERATED_PDF:', outPath, 'Bytes:', pdfBuffer.length);
