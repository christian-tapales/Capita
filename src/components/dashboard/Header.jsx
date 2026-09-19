import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Button } from '../common/Button';
import { Plus, Wallet, RotateCcw, DollarSign, Sun, Moon } from 'lucide-react';
import { CURRENCY_MAP } from '../../utils/currency';

export function Header({ onOpenAddModal }) {
  const currency = useFinanceStore((state) => state.currency);
  const setCurrency = useFinanceStore((state) => state.setCurrency);
  const resetToSampleData = useFinanceStore((state) => state.resetToSampleData);
  const theme = useFinanceStore((state) => state.theme);
  const toggleTheme = useFinanceStore((state) => state.toggleTheme);

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Date */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-100 tracking-tight">Capita</h1>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">{todayFormatted}</p>
            </div>
          </div>

          {/* Mobile Add button */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>
            <Button size="sm" onClick={onOpenAddModal} icon={Plus}>
              Add
            </Button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Currency Selector */}
          <div className="relative flex items-center">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 pr-7 font-medium focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none"
              title="Select display currency"
            >
              {Object.keys(CURRENCY_MAP).map((code) => (
                <option key={code} value={code} className="bg-slate-900">
                  {code} ({CURRENCY_MAP[code].symbol})
                </option>
              ))}
            </select>
            <DollarSign className="absolute right-2.5 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>

          {/* Theme Toggle for Desktop */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden sm:flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Reset sample data button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToSampleData}
            icon={RotateCcw}
            title="Reset to sample demo data"
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Reset Demo
          </Button>

          {/* Primary CTA for Desktop */}
          <div className="hidden sm:block">
            <Button
              variant="primary"
              size="md"
              onClick={onOpenAddModal}
              icon={Plus}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
