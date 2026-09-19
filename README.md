# 🚀 Capita | Personal Finance Tracker

**Capita** is a high-performance, client-side financial dashboard designed to showcase modern React patterns, resilient state management, precision math calculations, and interactive data visualization.

---

## 🛠️ Tech Stack & Tools

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React 18 (Vite 5)** | Modern, blazing-fast UI library & bundler. |
| **Styling** | **Tailwind CSS v4** | Utility-first responsive design with dark mode styling. |
| **State** | **Zustand (`persist`)** | Single source of truth with automated `localStorage` hydration. |
| **Charts** | **Recharts** | Dynamic SVG data visualizations for spending and cashflow. |
| **Icons** | **Lucide React** | Clean, modern iconography across all components. |
| **Animation** | **Framer Motion** | Micro-interactions and smooth UI transitions. |

---

## 🏗️ Architecture

Capita follows a modular feature-based folder structure:

* 📂 `src/components/common` — Reusable UI primitives (`Button`, `Input`, `Select`, `Modal`, `Card`, `Badge`).
* 📂 `src/components/dashboard` — Dashboard widgets (`Header`, `SummaryCards`, `StatCard`, `BudgetCard`, `QuickAddModal`).
* 📂 `src/components/transactions` — Transaction ledger (`TransactionList`, `TransactionItem`).
* 📂 `src/components/charts` — Recharts visualizers (*Phase 2*).
* 📂 `src/store` — Central **Zustand** store (`useFinanceStore.js`) with persistence.
* 📂 `src/utils` — Precision math (`currency.js`), date helpers (`date.js`), category definitions, and seed data.

---

## 🧠 Core Logic & Engineering Highlights

* **Zero-Backend Persistence:** All state automatically hydrates from and synchronizes to `localStorage`.
* **Safe Currency Arithmetic:** Floating-point math anomalies (e.g. `0.1 + 0.2`) are safely handled via dedicated rounding and summation helpers.
* **Master Roadmap & Context:** See [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) and [`AGENTS.md`](./AGENTS.md) for full engineering specifications.

---

## 📈 Implementation Roadmap

### 🟩 Phase 1: Foundation & Core CRUD
- [x] Initialize Vite + Tailwind CSS v4.
- [x] Create the **Zustand Store** with persistence and precision math utilities.
- [x] Build the responsive Dashboard layout with Metric Cards & Budget Progress.
- [x] Implement the `Add Transaction` modal/form with validation.
- [x] Build the Transaction History ledger with filters, search, and delete actions.

### 🟨 Phase 2: Data Visualization
- [x] Integrate **Recharts** for "Spending by Category" (Donut/Pie Chart) with interactive category breakdown and time range filters.
- [x] Implement "Income vs Expenses / Cashflow Trends" (Multi-series Bar Chart) over 6 months with net cash flow calculations.
- [x] Add custom glassmorphism tooltips, category legend cards, and zero-data empty state fallbacks.
- [x] Dark / Light theme toggler with persistent state.

### 🟦 Phase 3: The "Senior" Polish
- [x] **Transaction Search & Multi-Filters:** Instant search by title/category/notes, date range filtering, category selectors, and custom sorting.
- [x] **Export to CSV:** Client-side RFC-compliant CSV generator for all or filtered transactions.
- [x] **JSON Backup & Restore:** Complete export and schema-validated import of transaction state.
- [x] **Framer Motion:** Spring modal animations, backdrop blur transitions, and animated list item insertions/removals.
- [x] **Data Safety:** Confirmation dialogs for demo reset and ledger clearing.

---

## 💡 Technical Showcases for Recruiters

> [!TIP]
> **Key Architecture Discussions:**
> * **State Management:** Why Zustand with `persist` middleware was chosen over Context API for performance and reduced re-renders.
> * **Data Integrity:** How floating-point math is handled safely for financial calculations.
> * **Git & Branching Workflow:** Feature-branch strategy (`feat/phase-...`) with Conventional Commits.

---

## 🏁 Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/christian-tapales/Capita.git
cd Capita

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Run linter
npm run lint
```
