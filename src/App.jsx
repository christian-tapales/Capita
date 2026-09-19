import React, { useState, useEffect } from 'react';
import { useFinanceStore } from './store/useFinanceStore';
import { Header } from './components/dashboard/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BudgetCard } from './components/dashboard/BudgetCard';
import { CategoryPieChart } from './components/charts/CategoryPieChart';
import { CashflowTrendChart } from './components/charts/CashflowTrendChart';
import { TransactionList } from './components/transactions/TransactionList';
import { QuickAddModal } from './components/dashboard/QuickAddModal';
import { DataManagementModal } from './components/dashboard/DataManagementModal';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const theme = useFinanceStore((state) => state.theme);

  // Synchronize document theme class and attributes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Summary Metrics Overview */}
        <section aria-label="Financial Overview">
          <SummaryCards />
        </section>

        {/* 2. Visual Analytics Charts Grid */}
        <section aria-label="Visual Analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashflowTrendChart />
          <CategoryPieChart />
        </section>

        {/* 3. Monthly Budget Progress */}
        <section aria-label="Budget Progress">
          <BudgetCard />
        </section>

        {/* 4. Recent Transactions & Ledger */}
        <section aria-label="Transactions Ledger">
          <TransactionList onOpenAddModal={() => setIsAddModalOpen(true)} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <p>Capita Personal Finance Tracker • High Performance Client-Side Architecture</p>
      </footer>

      {/* Modals */}
      <QuickAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <DataManagementModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
      />
    </div>
  );
}

export default App;
