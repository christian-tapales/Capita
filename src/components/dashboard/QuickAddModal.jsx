import React, { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../utils/categories';
import { getTodayString } from '../../utils/date';
import { ArrowDownLeft, ArrowUpRight, Plus, DollarSign, Calendar, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

export function QuickAddModal({ isOpen, onClose }) {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const currency = useFinanceStore((state) => state.currency);

  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].id);
  const [date, setDate] = useState(getTodayString());
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === 'expense' ? EXPENSE_CATEGORIES[0].id : INCOME_CATEGORIES[0].id);
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Title is required';
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      errs.amount = 'Please enter a valid positive amount';
    }
    if (!date) {
      errs.date = 'Date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addTransaction({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
      notes,
    });

    // Reset Form
    setTitle('');
    setAmount('');
    setNotes('');
    setErrors({});
    onClose();
  };

  const categoryOptions = (type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Transaction"
      description="Record a new income or expense item to your ledger"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950/60 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-150",
              type === 'expense'
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <ArrowUpRight className="w-4 h-4" />
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={cn(
              "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-150",
              type === 'income'
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <ArrowDownLeft className="w-4 h-4" />
            Income
          </button>
        </div>

        {/* Title */}
        <Input
          label="Title / Description"
          placeholder={type === 'expense' ? 'e.g. Grocery Haul, Electric Bill' : 'e.g. Monthly Salary, Freelance Work'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          autoFocus
        />

        {/* Amount & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={`Amount (${currency})`}
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            icon={DollarSign}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Date */}
        <Input
          label="Transaction Date"
          type="date"
          icon={Calendar}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
        />

        {/* Notes */}
        <div className="space-y-1.5">
          <label htmlFor="tx-notes" className="block text-xs font-medium text-slate-300">
            Notes (Optional)
          </label>
          <div className="relative">
            <textarea
              id="tx-notes"
              rows={2}
              placeholder="Add optional details or memo..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant={type === 'expense' ? 'primary' : 'success'}
            size="md"
            icon={Plus}
          >
            Add {type === 'expense' ? 'Expense' : 'Income'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
