# 🚀 Capita | Personal Finance Tracker

**Capita** is a high-performance, frontend-only financial dashboard designed to showcase advanced React patterns, state management, and data visualization.

---

## 🛠️ Tech Stack & Tools

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **React (Vite)** | Modern, fast UI library. |
| **Styling** | **Tailwind CSS** | Utility-first responsive design. |
| **State** | **Zustand** | Global state for transactions. |
| **Charts** | **Recharts** | Dynamic SVG data visualization. |
| **Icons** | **Lucide-React** | Clean, consistent UI iconography. |
| **Animation** | **Framer Motion** | Smooth transitions and interactions. |

---

## 🏗️ Architecture

To ensure scalability and clean code, **Capita** follows a modular feature-based structure:

* 📂 `src/components` — Reusable UI atoms (Buttons, Inputs, Cards).
* 📂 `src/store` — The **Zustand** central nervous system (`useFinanceStore.js`).
* 📂 `src/hooks` — Custom hooks for `localStorage` persistence.
* 📂 `src/utils` — Pure functions for currency and date formatting.

---

## 🧠 Core Logic Flow (No-Backend)

Since this is a static deployment on GitHub Pages, the "backend" is simulated via the browser:

* **Persistence:** All data is synced to `Window.localStorage`.
* **Calculations:** Totals are computed in real-time using JavaScript `reduce()` methods.
* **Unique IDs:** Transactions use `crypto.randomUUID()` for unique keys.

---

## 📈 Implementation Roadmap

### 🟩 Phase 1: The Foundation
- [x] Initialize Vite + Tailwind CSS.
- [ ] Create the **Zustand Store** for CRUD operations.
- [ ] Build the responsive 3-column Dashboard layout.
- [ ] Implement the `Add Transaction` modal/form.

### 🟨 Phase 2: Data Visualization
- [ ] Integrate **Recharts** for "Spending by Category" (Pie Chart).
- [ ] Implement "Monthly Trends" (Area/Bar Chart).
- [ ] Add **Dark Mode** support using Tailwind's `dark` class.

### 🟦 Phase 3: The "Senior" Polish
- [ ] **Export to CSV:** Allow users to download their financial data.
- [ ] **Search & Filter:** Advanced filtering by date range and category.
- [ ] **Framer Motion:** Add entrance animations for list items.

---

## 💡 Technical Showcases for Recruiters

> [!TIP]
> **Highlight these features in your interview:**
> * **State Management:** Explain why you chose Zustand over Context API for performance.
> * **Data Integrity:** Show how you handle floating-point math for currency.
> * **UX/UI:** Discuss the mobile-first approach and accessibility (A11y).

---

## 🏁 Getting Started

To run **Capita** locally, follow these steps:

### 1. Clone & Install
```bash
git clone [https://github.com/your-username/capita.git](https://github.com/your-username/capita.git)
cd capita
npm install
