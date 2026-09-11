# 📋 Capita — Comprehensive Project Plan & Architecture Blueprint

> **Status:** Active Reference Document  
> **Last Updated:** September 2026  
> **Repository:** `christian-tapales/Capita`  
> **Target Deployment:** GitHub Pages (Static Client-Side App)

---

## 🎯 1. Project Vision & Objectives

**Capita** is a high-performance, client-side personal finance dashboard designed to showcase modern frontend architecture, resilient client-side state management, responsive UI design, dynamic data visualizations, and production-grade polish without requiring a backend server.

### Key Goals:
- **Zero-Backend Persistence:** Fast, offline-first user experience using `localStorage` with native Zustand synchronization.
- **Visual Excellence:** Modern aesthetic featuring dark/light modes, smooth animations, crisp typography (Inter / Outfit), and responsive layout.
- **Accurate Financial Calculations:** Safe floating-point arithmetic for balances, category totals, and monthly budget progress.
- **Data Portability:** Export to CSV, JSON backup import/export, and instant demo data seeding.

---

## 🛠️ 2. Refined Technology Stack

| Category | Technology | Role & Justification |
| :--- | :--- | :--- |
| **Runtime & Build** | **React 18 + Vite 5** | High-speed Hot Module Replacement (HMR) and optimized static production builds. |
| **Styling** | **Tailwind CSS + PostCSS** | Utility-first, responsive styling with full dark/light theme support. |
| **State Management** | **Zustand (`persist` middleware)** | Lightweight, performant state without Context boilerplate; built-in local persistence. |
| **Data Visualization** | **Recharts** | Declarative SVG charts for spending breakdown and cash flow trends. |
| **Icons** | **Lucide React** | Consistent, modern icon set. |
| **Animation** | **Framer Motion** | Micro-interactions, animated list entries, and modal transitions. |
| **Utilities** | **clsx + tailwind-merge** | Safe conditional CSS class composition. |

---

## 🏗️ 3. Project Directory Architecture

```
Capita/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages deployment
├── public/
│   ├── favicon.svg               # Custom Capita branding icon
│   └── sample-data.json          # Fallback backup/demo template
├── src/
│   ├── assets/                   # Static logos and graphics
│   ├── components/
│   │   ├── common/               # Atoms & Base UI Components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Toast.jsx
│   │   ├── dashboard/            # Dashboard Widgets & Panels
│   │   │   ├── Header.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── BudgetProgress.jsx
│   │   │   └── QuickAddModal.jsx
│   │   ├── charts/               # Recharts Visualizations
│   │   │   ├── CategoryPieChart.jsx
│   │   │   └── CashflowTrendChart.jsx
│   │   └── transactions/         # Transactions Management
│   │       ├── TransactionList.jsx
│   │       ├── TransactionItem.jsx
│   │       ├── TransactionFilters.jsx
│   │       └── EditTransactionModal.jsx
│   ├── store/
│   │   └── useFinanceStore.js    # Single Source of Truth (Zustand + Persist)
│   ├── utils/
│   │   ├── currency.js           # Precision math, currency formatting ($ / ₱ / € / £)
│   │   ├── date.js               # ISO dates, month groupings, relative timestamps
│   │   ├── exportCsv.js          # Client-side CSV generation and download
│   │   └── seedData.js           # Initial realistic sample data for new users
│   ├── App.jsx                   # Main layout shell & view assembly
│   ├── main.jsx                  # React application root
│   └── index.css                 # Tailwind directives, custom scrollbars, typography
├── index.html                    # SEO tags, viewport config, web fonts
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js                # Configured with GitHub Pages base URL
└── README.md
```

---

## 📊 4. Data Models & Schemas

### 4.1 Transaction Object
```javascript
{
  id: "uuid-v4-string",
  title: "Grocery Shopping",
  amount: 85.50,               // Positive number
  type: "expense" | "income",
  category: "Food & Groceries",
  date: "2026-09-11",          // YYYY-MM-DD format
  notes: "Weekly essentials at Trader Joe's",
  createdAt: 1726038000000     // Timestamp
}
```

### 4.2 Standard Category Definitions
* **Income Categories:** `Salary`, `Freelance`, `Investments`, `Gift`, `Other Income`
* **Expense Categories:** `Food & Dining`, `Housing & Rent`, `Utilities`, `Transportation`, `Shopping`, `Entertainment`, `Health & Wellness`, `Education`, `Other Expense`

### 4.3 App Configuration & Settings
```javascript
{
  currency: "USD",             // USD ($), EUR (€), GBP (£), PHP (₱)
  monthlyBudget: 3000,         // Target monthly spending cap
  theme: "system" | "dark" | "light"
}
```

---

## 🚀 5. Phased Implementation Roadmap

```
Phase 1: Foundation & CRUD ───► Phase 2: Visualizations ───► Phase 3: Polish & Senior Features ───► Phase 4: Deploy
 (Tailwind, Store, Layout)       (Recharts, Dark Mode)        (Search, CSV Export, Demo Seeds)       (CI/CD, Pages)
```

### 🟩 Phase 1: Foundation & Core CRUD (Current Priority)
- [ ] **Dependencies & Build Setup:** Install Tailwind CSS, PostCSS, Autoprefixer, Zustand, Lucide React, clsx, tailwind-merge.
- [ ] **Design Tokens & Fonts:** Configure Tailwind colors (slate/zinc dark palette, emerald for income, rose for expense), Inter font, glassmorphism utilities.
- [ ] **Core Utilities:**
  - `currency.js`: Safe precision rounding (`Math.round((amount + Number.EPSILON) * 100) / 100`) and localized formatting.
  - `date.js`: Helpers for sorting, current month filtering, formatters.
- [ ] **Zustand Finance Store:**
  - Create `useFinanceStore.js` with `persist` middleware.
  - Implement CRUD actions: `addTransaction`, `deleteTransaction`, `updateTransaction`, `clearAllTransactions`, `loadSampleData`.
  - Computed getters: `getTotalBalance()`, `getTotalIncome()`, `getTotalExpenses()`, `getSavingsRate()`.
- [ ] **Core UI & Dashboard Layout:**
  - Top Navigation Bar (Logo, Date, Theme toggle placeholder, "Add Transaction" CTA).
  - 4 Summary Metric Cards (Total Balance, Monthly Income, Monthly Expenses, Net Savings).
  - "Add Transaction" Modal with full field validation (Title, Amount, Category, Type, Date, Notes).
  - Transaction History List with delete action and category badges.

---

### 🟨 Phase 2: Data Visualization & Analytics
- [ ] **Recharts Integration:**
  - `CategoryPieChart.jsx`: Donut chart showing expense distribution with interactive hover tooltips and category legends.
  - `CashflowTrendChart.jsx`: Smooth Area/Bar chart comparing monthly Income vs Expense trends.
- [ ] **Budget Progress Tracker (`BudgetProgress.jsx`):**
  - Dynamic progress bar comparing current monthly expenses against user's defined budget limit.
  - Visual status alerts: Safe (Green), Caution (>75% Yellow), Over-budget (>100% Red).
- [ ] **Dark / Light Mode System:**
  - Smooth theme toggling with `localStorage` persistence and system color-scheme sync.

---

### 🟦 Phase 3: Senior Polish & Advanced Features
- [ ] **Search & Multi-Filter Engine:**
  - Real-time search by title/notes.
  - Filter by category, type (all/income/expense), and date range (This Month, Last 30 Days, All Time).
  - Sort by date (newest/oldest) and amount (highest/lowest).
- [ ] **CSV Export & Data Backup:**
  - Client-side CSV generator downloading current or filtered transactions.
  - JSON backup download and file-upload restore tool.
- [ ] **Demo Seed Data & Safety Tools:**
  - "Load Demo Data" button for recruiters/testers to populate 15+ realistic entries instantly.
  - "Reset Data" confirmation modal.
- [ ] **Framer Motion Micro-Interactions:**
  - Animated number counters for balance cards.
  - Smooth entrance animations for transaction items and modal overlays.
- [ ] **Mobile & Tablet Optimization:**
  - Fully responsive collapsible layout tailored for smartphone viewports.

---

### 🟪 Phase 4: Production Readiness & GitHub Deployment
- [ ] Configure `base` path in `vite.config.js` for GitHub Pages.
- [ ] Create `.github/workflows/deploy.yml` for automated continuous deployment.
- [ ] Add SEO meta tags, OpenGraph previews, and custom browser favicon.
- [ ] Run full build validation (`npm run build` and `npm run lint`).

---

## 🔍 6. Quality & Direction Verification Matrix

Use this checklist during development to ensure we never deviate from our plan:

| Milestone | Checkpoints for Verification | Status |
| :--- | :--- | :--- |
| **State Persistence** | Refreshing browser retains all added/edited transactions via Zustand `persist`. | ⏳ Pending |
| **Financial Accuracy** | Adding $0.10 + $0.20 results in exactly $0.30 with no floating point errors. | ⏳ Pending |
| **Form Safety** | Empty fields, zero or negative amounts cannot be submitted. | ⏳ Pending |
| **Responsive UI** | Dashboard operates smoothly on Mobile (375px), Tablet (768px), and Desktop (1280px+). | ⏳ Pending |
| **Visual Charts** | Empty state charts render clean placeholders; populated states render accurately. | ⏳ Pending |
| **Zero Console Errors** | React StrictMode, ESLint, and Vite production builds complete with 0 warnings/errors. | ⏳ Pending |

---

*This document serves as the master architectural guide for the Capita project.*
