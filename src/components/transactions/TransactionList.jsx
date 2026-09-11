import React, { useState, useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { TransactionItem } from './TransactionItem';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Search, Plus, ArrowUpDown, ReceiptText, Filter } from 'lucide-react';

export function TransactionList({ onOpenAddModal }) {
  const transactions = useFinanceStore((state) => state.transactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // Type filter
        if (filterType !== 'all' && tx.type !== filterType) return false;

        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = tx.title.toLowerCase().includes(query);
          const matchCategory = tx.category.toLowerCase().includes(query);
          const matchNotes = tx.notes ? tx.notes.toLowerCase().includes(query) : false;
          if (!matchTitle && !matchCategory && !matchNotes) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [transactions, filterType, searchQuery, sortBy]);

  return (
    <Card
      title="Recent Transactions"
      subtitle={`Showing ${filteredTransactions.length} of ${transactions.length} total entries`}
      action={
        <div className="flex items-center gap-2">
          <Button size="sm" variant="primary" onClick={onOpenAddModal} icon={Plus}>
            New
          </Button>
        </div>
      }
    >
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-9 pr-3.5 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Type Filter Buttons */}
          <div className="flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            {['all', 'expense', 'income'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                  filterType === t
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List Entries */}
      {filteredTransactions.length === 0 ? (
        <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/30">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <ReceiptText className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">No transactions found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            {searchQuery || filterType !== 'all'
              ? 'Try adjusting your search query or filter settings.'
              : 'Start by adding your first income or expense transaction.'}
          </p>
          <div className="mt-4">
            <Button size="sm" onClick={onOpenAddModal} icon={Plus}>
              Add Transaction
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTransactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      )}
    </Card>
  );
}
