export const CATEGORIES = [
  // Expense Categories
  { id: 'Food & Dining', name: 'Food & Dining', type: 'expense', icon: 'Utensils', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', hexColor: '#f59e0b' },
  { id: 'Housing & Rent', name: 'Housing & Rent', type: 'expense', icon: 'Home', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20', hexColor: '#6366f1' },
  { id: 'Utilities', name: 'Utilities', type: 'expense', icon: 'Zap', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20', hexColor: '#06b6d4' },
  { id: 'Transportation', name: 'Transportation', type: 'expense', icon: 'Car', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', hexColor: '#3b82f6' },
  { id: 'Shopping', name: 'Shopping', type: 'expense', icon: 'ShoppingBag', color: 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20', hexColor: '#d946ef' },
  { id: 'Entertainment', name: 'Entertainment', type: 'expense', icon: 'Film', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', hexColor: '#a855f7' },
  { id: 'Health & Wellness', name: 'Health & Wellness', type: 'expense', icon: 'HeartPulse', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20', hexColor: '#f43f5e' },
  { id: 'Education', name: 'Education', type: 'expense', icon: 'GraduationCap', color: 'bg-teal-500/10 text-teal-500 border-teal-500/20', hexColor: '#14b8a6' },
  { id: 'Other Expense', name: 'Other Expense', type: 'expense', icon: 'MoreHorizontal', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20', hexColor: '#64748b' },

  // Income Categories
  { id: 'Salary', name: 'Salary', type: 'income', icon: 'Briefcase', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', hexColor: '#10b981' },
  { id: 'Freelance', name: 'Freelance', type: 'income', icon: 'Laptop', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', hexColor: '#34d399' },
  { id: 'Investments', name: 'Investments', type: 'income', icon: 'TrendingUp', color: 'bg-green-500/10 text-green-400 border-green-500/20', hexColor: '#22c55e' },
  { id: 'Gift', name: 'Gift', type: 'income', icon: 'Gift', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', hexColor: '#10b981' },
  { id: 'Other Income', name: 'Other Income', type: 'income', icon: 'PlusCircle', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20', hexColor: '#94a3b8' },
];

export const EXPENSE_CATEGORIES = CATEGORIES.filter(c => c.type === 'expense');
export const INCOME_CATEGORIES = CATEGORIES.filter(c => c.type === 'income');

export function getCategoryMeta(categoryName) {
  return CATEGORIES.find(c => c.name === categoryName) || {
    id: categoryName,
    name: categoryName,
    type: 'expense',
    icon: 'Tag',
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    hexColor: '#64748b'
  };
}
