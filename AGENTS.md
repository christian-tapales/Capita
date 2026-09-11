# 🤖 AGENTS.md — AI Context & Engineering Guidelines for Capita

> This file provides persistent context, architectural constraints, and development guidelines for AI assistants working on the **Capita** codebase.

---

## 📌 1. Project Overview & Philosophy

- **Name:** Capita (Personal Finance Tracker)
- **Nature:** High-performance, client-side, zero-backend web application.
- **Master Plan:** Refer to [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) for full phase-by-phase roadmap and verification checkpoints.
- **Core Philosophy:** Fast, privacy-focused (offline-first with `localStorage`), visually stunning (dark/light themes, smooth transitions), and mathematically accurate.

---

## 🛠️ 2. Tech Stack & Key Libraries

| Technology | Purpose | Guidelines |
| :--- | :--- | :--- |
| **React 18 + Vite 5** | UI Library & Bundler | Use functional components and modern React hooks. |
| **Tailwind CSS** | Styling | Mobile-first utility classes, dark mode with `class` strategy. |
| **Zustand** | State Management | Use native `persist` middleware. Single source of truth in `src/store/useFinanceStore.js`. |
| **Recharts** | Data Visualizations | Category spending pie charts & cashflow trends. Must handle empty states gracefully. |
| **Lucide React** | Iconography | Use clean, consistent icons across all UI atoms and widgets. |
| **Framer Motion** | Micro-Animations | Smooth modal entrances, list item insertions, and animated metrics. |
| **clsx + tailwind-merge** | Class Composition | Use helper `cn(...)` utility for combining conditional classes. |

---

## 📐 3. Directory Structure & Conventions

```
src/
├── assets/          # Static assets & illustrations
├── components/
│   ├── common/      # Reusable UI primitives (Button, Input, Modal, Card, Badge, Toast)
│   ├── dashboard/   # Dashboard widgets (Header, StatCard, SummaryCards, BudgetProgress)
│   ├── charts/      # Recharts data visualizers (CategoryPieChart, CashflowTrendChart)
│   └── transactions/# Transaction management (TransactionList, TransactionItem, Filters)
├── store/           # Zustand store (useFinanceStore.js)
├── utils/           # Pure helpers (currency.js, date.js, exportCsv.js, seedData.js)
├── App.jsx          # Top-level application shell & view coordinator
├── main.jsx         # React DOM mount point
└── index.css        # Tailwind directives and global typography
```

---

## ⚠️ 4. Critical Engineering Rules & Guardrails

1. **No Backend Services:**
   - Never import or suggest backend APIs, databases (Firebase/Supabase), or Node server endpoints unless explicitly requested.
   - All state must persist via Zustand `persist` to the browser's `localStorage`.

2. **Currency & Math Safety:**
   - **Never** perform raw floating-point additions/subtractions directly on currency floats (e.g., `0.1 + 0.2`).
   - Always route calculations through `src/utils/currency.js` helpers for consistent two-decimal rounding.

3. **Data Schema Consistency:**
   - Transactions must conform to the defined schema:
     `{ id, title, amount, type: 'income'|'expense', category, date: 'YYYY-MM-DD', notes, createdAt }`.

4. **Git & Commit Standards:**
   - Follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`).
   - Work on feature branches (`feat/...`, `fix/...`) and keep commits atomic.

5. **Aesthetics & UI Standards:**
   - Avoid plain, default browser styling.
   - Use curated Tailwind color palettes (`emerald` for income, `rose` for expenses, sleek `slate`/`zinc` for neutrals).
   - Ensure all interactive elements have responsive states (`hover:`, `focus-visible:`, `active:`).
