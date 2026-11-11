# 🏢 KSS PROCUREMENT OPERATING SYSTEM
## Comprehensive Academic & Technical Project Report • FY 2026

**Domain:** Enterprise Supply Chain, B2B Sourcing, Financial Governance & ERP Automation  
**Organization:** KSS Enterprise Systems • Supply Chain & Procurement Division  
**Candidate / Developer:** Pratiksha Harode • Procurement Systems Lead  
**Faculty / Project Guide:** Department of Computer Science & Engineering  

---

## 📑 Executive Metadata & Snapshot

| Key Metric | Specification |
| :--- | :--- |
| **Project Title** | KSS Procurement OS (Enterprise Procurement System) |
| **Target Stakeholders** | Department Team Leads, Approving Managers, Finance Controllers, IT Admins, Verified External Vendors |
| **Primary Architecture** | Decoupled Client-Server (React 18 SPA + Django REST Framework) |
| **Frontend Stack** | React 18, TypeScript, Vite 5, Tailwind CSS, Lucide Icons |
| **Backend Stack** | Python 3.10+, Django 4.2+, Django REST Framework (DRF), SimpleJWT |
| **Database** | Relational PostgreSQL / SQLite with optimized compound indexes |
| **Security Guards** | IDOR Session Scoping, 5-Tier RBAC, Immutable Audit Logs, Three-Way Matching |
| **Document Type & Year**| Comprehensive Academic & Technical Project Report • FY 2026 |

---

## 1. Executive Summary

The **KSS Procurement OS** is a full-stack enterprise web application designed to eliminate paper-bound requisition bottlenecks, opaque offline quotation bidding, rogue spending, and lack of accountability in corporate procurement workflows. Operating as a unified single-window digital interface for enterprise supply chain operations, it connects department team leads directly with authorized managers, finance controllers, executive administrators, and registered external vendors.

### Core System Vital Metrics
- **8+ Core Procurement Modules:** From purchase requisition and multi-vendor RFQ bidding to goods receipt notes and financial disbursements.
- **5 User Personas:** Distinct isolated portals for Team Lead, Manager, Finance, Vendor, and Super Admin.
- **100% Immutable Audit Trail:** Every status change, approval remark, cost estimation, and payment reference is permanently logged.
- **0 s Automated Routing Delay:** Immediate transition and queue assignment driven by Django ORM signals and state machines.

---

## 2. Problem Formulation & Modern Solution Matrix

| Traditional Pain Point | Real-World Impact | Digital System Solution |
| :--- | :--- | :--- |
| **Manual Paper Requisitions** | Department employees spend days drafting paper purchase slips, chasing physical signatures, and experiencing weeks of idle requisition latency. | **24/7 Digital Self-Service** with multi-step interactive forms, automated category taxonomy, and instant tracking reference receipts. |
| **Opaque Vendor Bidding & Sourcing** | Unstandardized quotation exchanges via email lead to supplier favoritism, bid tampering, and inflated unit procurement costs. | **Encrypted RFQ Sourcing Portal** with sealed multi-vendor bid submissions, automated tax calculations (GST), and transparent evaluation matrices. |
| **Unverified Invoices & Rogue Spending** | Finance teams process invoices for unreceived, damaged, or mispriced items with no programmatic reconciliation against purchase orders. | **Strict Three-Way Matching Engine** reconciling Purchase Order (PO), Goods Receipt Note (GRN), and Vendor Invoice before payment authorization. |
| **Disjointed Communication & Audit Silos** | Approvals lack transparent audit trails, leaving auditors unable to verify who approved cost adjustments, when, or under what business justification. | **Immutable ApprovalHistory Audit Logs** recording exact microsecond timestamps, user roles, cost-center snapshots, and mandatory remarks. |

> 💡 **Key Innovation:** The system features an **Enterprise Multi-Portal Architecture**. It operates dynamically with the high-performance Django REST Framework API while maintaining seamless dual workflow branching for **Flow A (Physical Hardware & Capital Assets)** and **Flow B (Software, Cloud Subscriptions & SaaS Licenses)** with specialized justification lifecycles.

---

## 3. System Architecture & Technical Stack

The platform adopts a decoupled Client-Server architecture ensuring sub-second page transitions, responsive touch ergonomics, and enterprise-grade relational consistency.

```
+------------------------------------------------------------------------------------+
|                                   CLIENT LAYER                                     |
| +--------------------+ +--------------------+ +--------------------+ +-----------+ |
| |  Team Lead Portal  | |   Manager Portal   | |   Finance Portal   | |   Vendor  | |
| +--------------------+ +--------------------+ +--------------------+ +-----------+ |
| +--------------------------------------------------------------------------------+ |
| | React 18 (Vite) SPA | TypeScript | Tailwind CSS Tokens | Lucide Icon Suite     | |
| +--------------------------------------------------------------------------------+ |
+-----------------------------------------|------------------------------------------+
                                          | REST API (JSON / HTTPS & Bearer JWT)
                                          v
+------------------------------------------------------------------------------------+
|                                 BACKEND API LAYER                                  |
| +--------------------------------------------------------------------------------+ |
| |                 Python 3.10+ / Django 4.2+ REST Framework                      | |
| | - Automated Tiered Routing Engine     - Insecure Direct Object (IDOR) Guard    | |
| | - Role-Based Access Control Interceptor- Immutable Status History Manager     | |
| | - Three-Way Matching Engine (PO/GRN)  - Dynamic Budget Allocation Controller   | |
| +--------------------------------------------------------------------------------+ |
+-----------------------------------------|------------------------------------------+
                                          | ORM Data Bindings
                                          v
+------------------------------------------------------------------------------------+
|                                  DATABASE LAYER                                    |
| +------------------------------------+ +-----------------------------------------+|
| | Relational DB (PostgreSQL/SQLite)  | | Secure Media & Document Store            ||
| | Users, Requests, RFQs, Orders, Logs| | Encrypted Invoices, Quotes, Receipts, POD||
| +------------------------------------+ +-----------------------------------------+|
+------------------------------------------------------------------------------------+
```

---

## 4. 5-Tier Role-Based Access Control (RBAC)

| Role | Target Persona | Authorized Actions & Feature Isolation |
| :--- | :--- | :--- |
| **Team Lead** | Department Leads & Requisitioners | Submit purchase requests (Flow A Hardware / Flow B SaaS), attach technical specifications, track live 4-stage stepper, execute mock payments, submit payment justification documents (IDOR Protected). |
| **Manager** | Department Heads & Budget Custodians | Conduct market research & pre-estimation, review department request queue, approve/reject requests with mandatory remarks, track department budget limits, raise RFQs, verify goods receipts. |
| **Finance** | Financial Officers & Controllers | Company-wide budget oversight, cost estimation validation, verify 3-Way Match (PO, Goods Receipt, Vendor Invoice), execute disbursement (NEFT/RTGS/Card), generate audit reports. |
| **Vendor** | External Suppliers & Contractors | Inspect invited RFQs, submit sealed itemized quotations (Base Price + GST), review issued Purchase Orders, acknowledge dispatch dates, and upload digital tax invoices. |
| **Super Admin** | Procurement Directors & IT Admins | Master system control, department & user provisioning, role escalation, vendor KYC onboarding & category management, budget ceiling allocation, immutable security audit logs. |

---

## 5. Comprehensive Procurement Services Suite

The platform provides digital workflows across 10 vital procurement and supply chain modules:

| Service Name | Department / Domain | SLA | Workflow Summary |
| :--- | :--- | :--- | :--- |
| **1. Purchase Requisition (PR)** | Request Management | 24 Hours | Department user uploads technical specifications and justification; auto-routed to Manager active queue. |
| **2. Pre-Estimation & Research** | Manager Operations | 48 Hours | Manager evaluates market alternatives, renewal vs upgrade costs, and records approved price ceilings. |
| **3. Request for Quotation (RFQ)** | Sourcing & Bidding | 3 Days | Competitive bidding initiated; invited vendors receive notifications and submit itemized quotes with tax breakdowns. |
| **4. Quotation Evaluation** | Vendor Management | 24 Hours | Multi-vendor bid comparison matrix; system enforces single selected vendor rule with audit rationale. |
| **5. Purchase Order (PO)** | Procurement Execution | Instant | Automated PO generation with unique cryptographic PO reference (`PO-XXXX`), terms, and vendor dispatch. |
| **6. Goods Receipt Note (GRN)** | Warehouse / Logistics | 24 Hours | Physical delivery logged with ordered vs received quantity check, damage reporting, and receipt verification timestamp. |
| **7. Vendor Invoice Verification** | Invoice Management | 48 Hours | Vendor uploads digital invoice (`INV-XXXX`) with tax breakdown; system flags for Three-Way Matching. |
| **8. Three-Way Matching** | Finance & Audit | Instant | Automated reconciliation of Purchase Order, Goods Receipt, and Invoice amounts to eliminate discrepancy and over-billing. |
| **9. Payment Disbursement** | Finance & Treasury | Instant | Payment execution via NEFT/RTGS/UPI or simulated corporate disbursement; transaction reference logged. |
| **10. Department Budget Lock** | Budget Management | Instant | Real-time budget limit enforcement (`Fiscal Year 2026`) tracking committed vs spent funds per cost center. |

---

## 6. Citizen / Requisitioner Request Lifecycle Stepper

Every procurement request traverses a 4-stage transparent state machine:

```
[ 1: Submitted ] ────────► [ 2: Dept Assigned ] ────────► [ 3: In Progress ] ────────► [ 4: Resolved ]
 Application created with    Auto-routed to Dept Manager   RFQ bidding, PO dispatch &    Three-Way Match verified,
 tech specs & justification  queue for pre-estimation      physical inspection active    payment disbursed & closed
```

1. **Submitted:** Requisition initiated with itemized bills, tech specifications, and business justifications.
2. **Dept Assigned:** Automatically routed to the department manager's active backlog for pre-estimation and budget check.
3. **In Progress:** Sourcing, RFQ quotation comparisons, vendor purchase order issuance, and physical warehouse inspection.
4. **Resolved:** 3-Way reconciliation signed off, accounts payable disbursement executed, and audit trail closed.

---

## 7. Database Schema & Entity Relationships

| Table Name | Primary Key | Key Attributes & Constraints |
| :--- | :--- | :--- |
| **User** | `id` (INT / UUID) | `username`, `email` (Unique), `password` (PBKDF2/SHA256), `role` (Enum), `department` (FK), `phone`, `cost_center` |
| **Department** | `id` (INT) | `name` (Unique), `code` (Unique), `description`, `created_at`, `updated_at` |
| **PurchaseRequest** | `id` / `request_id` (VARCHAR) | `title`, `category`, `requested_amount`, `current_stage`, `status`, `flow_type` (A/B), `created_by` (FK), `department` (FK) |
| **RFQ** | `id` / `rfq_id` (VARCHAR) | `title`, `deadline`, `status` (Open/Closed), `invited_vendors` (M2M), `purchase_request` (FK) |
| **Quotation** | `id` / `quotation_id` (VARCHAR) | `rfq` (FK), `vendor` (FK), `price`, `gst_rate`, `tax_amount`, `total_amount`, `status` (Enum), `delivery_days` |
| **PurchaseOrder** | `id` / `po_id` (VARCHAR) | `purchase_request` (FK), `quotation` (FK), `vendor` (FK), `total_amount`, `status`, `expected_delivery` |
| **GoodsReceipt** | `id` / `receipt_id` (VARCHAR) | `purchase_order` (FK), `received_by` (FK), `ordered_quantity`, `received_quantity`, `status`, `verified_at` |
| **Invoice** | `id` / `invoice_id` (VARCHAR) | `purchase_order` (FK), `vendor` (FK), `invoice_number`, `amount`, `tax_amount`, `status`, `is_manager_verified` |
| **ThreeWayMatch** | `id` / `match_id` (VARCHAR) | `purchase_order` (FK), `goods_receipt` (FK), `invoice` (FK), `po_amount`, `invoice_amount`, `is_matched` |
| **ApprovalHistory** | `id` (UUID / INT) | `request` (FK), `action`, `performed_by` (FK), `user_role`, `previous_status`, `new_status`, `comments`, `timestamp` |

---

## 8. REST API Specifications & Endpoints

| Method | Endpoint | Description | Access Guard |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/login/` | Validates credentials; returns auth JWT token & user profile. | Public |
| **POST** | `/api/auth/register/` | Registers new user with department and role assignment. | Public |
| **POST** | `/api/team-lead/requests/` | Submits new request; triggers auto-routing and manager queue assignment. | Team Lead |
| **GET** | `/api/team-lead/requests/` | Fetches user's own submitted requests (IDOR protected). | Team Lead |
| **GET** | `/api/manager/requests/` | Returns assigned tickets for department manager queue. | Manager |
| **GET** | `/api/finance/requests/` | Returns complete company request queue for finance audit & oversight. | Finance |
| **POST** | `/api/requests/{id}/approve/` | Transitions request status, appends to ApprovalHistory, notifies stakeholders. | Manager / Finance |

---

## 9. Security Architecture & IDOR Guard

🛡️ **Enterprise Security Implementations:**
- **IDOR Protection:** Requisition and quotation API queries strictly filter by authenticated session token rather than user-supplied query parameters, preventing unauthorized viewing of other departments' or vendors' data.
- **Immutable Audit Trails:** Every status transition generates an append-only record in `ApprovalHistory`, preventing retrospective data tampering or unauthorized amount modifications.
- **Client-Side Role Guards:** React `ProtectedRoute` verifies role permissions and JWT tokens before mounting protected portal dashboard views.

---

## 10. Viva Voce & Technical Defense Guide

| Viva Question | Technical Answer |
| :--- | :--- |
| **What is the core innovation of this project?** | Automated tiered procurement orchestration integrating 5-role RBAC, closed-loop 4-stage tracking stepper, sealed RFQ bidding, and automated Three-Way Matching with immutable audit trails. |
| **How is Role-Based Access Control enforced?** | Dual-layer protection: React `ProtectedRoute` guards in the frontend and Django REST Framework permission classes at the API layer. |
| **How does IDOR protection work in the API?** | The backend queries filter requests strictly using authenticated session email and user identity, preventing unauthorized access across departments and vendors. |

---

## 11. Project Sign-Off & Evaluation Sheet

This report certifies that the **KSS Procurement Operating System** has been implemented, validated across all 5 user roles, and verified for production-grade enterprise procurement and governance standards.

---
**Candidate / Developer Signature:**  
`Pratiksha Harode • Procurement Systems Lead`  

**Project Guide / Faculty Examiner:**  
`Department of Computer Science & Engineering`  

