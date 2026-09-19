import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFinanceStore } from '../../store/useFinanceStore';
import { TransactionItem } from './TransactionItem';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CATEGORIES } from '../../utils/categories';
import { isCurrentMonth, isCurrentYear, isWithinLastNDays } from '../../utils/date';
import { exportTransactionsToCSV } from '../../utils/exportCsv';
import {
  Search,
  Plus,
  ArrowUpDown,
  ReceiptText,
  Filter,
  Download,
  X,
  RotateCcw,
} from 'lucide-react';

export function TransactionList({ onOpenAddModal }) {
  const transactions = useFinanceStore((state) => state.transactions);
  const currency = useFinanceStore((state) => state.currency);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all'); // 'all' | 'this-month' | 'last-30' | 'this-year'
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Available categories based on selected type
  const availableCategories = useMemo(() => {
    if (filterType === 'income') return CATEGORIES.filter((c) => c.type === 'income');
    if (filterType === 'expense') return CATEGORIES.filter((c) => c.type === 'expense');
    return CATEGORIES;
  }, [filterType]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    filterType !== 'all' ||
    categoryFilter !== 'all' ||
    dateRange !== 'all' ||
    sortBy !== 'date-desc';

  const resetAllFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setCategoryFilter('all');
    setDateRange('all');
    setSortBy('date-desc');
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // 1. Type filter
        if (filterType !== 'all' && tx.type !== filterType) return false;

        // 2. Category filter
        if (categoryFilter !== 'all' && tx.category !== categoryFilter) return false;

        // 3. Date Range filter
        if (dateRange === 'this-month' && !isCurrentMonth(tx.date)) return false;
        if (dateRange === 'last-30' && !isWithinLastNDays(tx.date, 30)) return false;
        if (dateRange === 'this-year' && !isCurrentYear(tx.date)) return false;

        // 4. Search query (title, category, notes)
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
  }, [transactions, filterType, categoryFilter, dateRange, searchQuery, sortBy]);

  const handleExportFiltered = () => {
    if (filteredTransactions.length === 0) return;
    exportTransactionsToCSV(filteredTransactions, currency, `capita-filtered-${Date.now()}.csv`);
  };

  return (
    <Card
      title="Recent Transactions"
      subtitle={`Showing ${filteredTransactions.length} of ${transactions.length} total entries`}
      action={
        <div className="flex items-center gap-2">
          {filteredTransactions.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleExportFiltered}
              icon={Download}
              title="Export currently filtered transactions to CSV"
              className="hidden sm:inline-flex text-xs text-slate-400 hover:text-slate-200"
            >
              Export CSV
            </Button>
          )}

          <Button size="sm" variant="primary" onClick={onOpenAddModal} icon={Plus}>
            New
          </Button>
        </div>
      }
    >
      {/* Search & Quick Controls Bar */}
      <div className="space-y-3 mb-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, category, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200"
                title="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Type Pills */}
          <div className="flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs shrink-0 self-start sm:self-auto">
            {['all', 'expense', 'income'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setFilterType(t);
                  setCategoryFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                  filterType === t
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Mobile / Quick Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`sm:hidden flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
              isFiltersOpen || hasActiveFilters
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                : 'bg-slate-950/80 border-slate-800 text-slate-300'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Secondary Filter Controls (Category, Date Range, Sort) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 ${
            isFiltersOpen ? 'block' : 'hidden sm:grid'
          }`}
        >
          {/* Category Dropdown */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Dropdown */}
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="this-month">This Month</option>
              <option value="last-30">Last 30 Days</option>
              <option value="this-year">This Year</option>
            </select>
          </div>

          {/* Sort Dropdown & Reset */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
                title="Reset all filters to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transaction List Entries with Framer Motion */}
      {filteredTransactions.length === 0 ? (
        <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/30">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <ReceiptText className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">No transactions found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            {hasActiveFilters
              ? 'Try adjusting your search query, date range, or category filter.'
              : 'Start by adding your first income or expense transaction.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {hasActiveFilters ? (
              <Button size="sm" variant="ghost" onClick={resetAllFilters} icon={RotateCcw}>
                Reset Filters
              </Button>
            ) : (
              <Button size="sm" onClick={onOpenAddModal} icon={Plus}>
                Add Transaction
              </Button>
            )}
          </div>
        </div>
      ) : (
        <motion.div layout className="space-y-2.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Card>
  );
}
