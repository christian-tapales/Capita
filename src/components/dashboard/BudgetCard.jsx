import React, { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { formatCurrency } from '../../utils/currency';
import { Target, Edit3, Check } from 'lucide-react';

export function BudgetCard() {
  const currency = useFinanceStore((state) => state.currency);
  const monthlyBudget = useFinanceStore((state) => state.monthlyBudget);
  const setMonthlyBudget = useFinanceStore((state) => state.setMonthlyBudget);
  const getCurrentMonthExpenses = useFinanceStore((state) => state.getCurrentMonthExpenses);

  const currentExpenses = getCurrentMonthExpenses();
  const [isEditing, setIsEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  const percentage = monthlyBudget > 0 ? Math.min(100, Math.round((currentExpenses / monthlyBudget) * 100)) : 0;
  const remaining = Math.max(0, monthlyBudget - currentExpenses);

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const parsed = parseFloat(budgetInput);
    if (!isNaN(parsed) && parsed > 0) {
      setMonthlyBudget(parsed);
    }
    setIsEditing(false);
  };

  const getStatusColor = () => {
    if (percentage >= 100) return 'bg-rose-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <Card
      title="Monthly Spending Budget"
      subtitle="Track your current month spending against your target cap"
      action={
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setBudgetInput(monthlyBudget.toString());
            setIsEditing(!isEditing);
          }}
          icon={isEditing ? Check : Edit3}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          {isEditing ? 'Cancel' : 'Edit Budget'}
        </Button>
      }
    >
      {isEditing ? (
        <form onSubmit={handleSaveBudget} className="flex items-end gap-3 py-2">
          <div className="flex-1">
            <Input
              label={`Monthly Budget Cap (${currency})`}
              type="number"
              step="50"
              min="10"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" size="md" variant="primary">
            Save
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100">
                {formatCurrency(currentExpenses, currency)}
              </span>
              <span className="text-sm text-slate-400">
                spent of {formatCurrency(monthlyBudget, currency)} cap
              </span>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                percentage >= 100
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : percentage >= 75
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              {percentage}% Used
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getStatusColor()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>
              {percentage >= 100 ? '⚠️ Budget limit exceeded' : `Remaining: ${formatCurrency(remaining, currency)}`}
            </span>
            <span>Target: {formatCurrency(monthlyBudget, currency)}/mo</span>
          </div>
        </div>
      )}
    </Card>
  );
}
