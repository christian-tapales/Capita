import React, { useState } from 'react';
import { Header } from './components/dashboard/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BudgetCard } from './components/dashboard/BudgetCard';
import { TransactionList } from './components/transactions/TransactionList';
import { QuickAddModal } from './components/dashboard/QuickAddModal';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Navbar */}
      <Header onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Summary Metrics Overview */}
        <section aria-label="Financial Overview">
          <SummaryCards />
        </section>

        {/* 2. Monthly Budget Progress */}
        <section aria-label="Budget Progress">
          <BudgetCard />
        </section>

        {/* 3. Recent Transactions & Ledger */}
        <section aria-label="Transactions Ledger">
          <TransactionList onOpenAddModal={() => setIsAddModalOpen(true)} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500">
        <p>Capita Personal Finance Tracker • High Performance Client-Side Architecture</p>
      </footer>

      {/* Add Transaction Modal */}
      <QuickAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default App;
