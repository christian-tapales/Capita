import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';
import { getCategoryMeta } from '../../utils/categories';
import { Badge } from '../common/Badge';
import {
  Trash2,
  Utensils,
  Home,
  Zap,
  Car,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  PlusCircle,
  MoreHorizontal,
  Tag,
} from 'lucide-react';

const ICON_COMPONENTS = {
  Utensils,
  Home,
  Zap,
  Car,
  ShoppingBag,
  Film,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Laptop,
  TrendingUp,
  Gift,
  PlusCircle,
  MoreHorizontal,
  Tag,
};

export function TransactionItem({ transaction }) {
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);
  const currency = useFinanceStore((state) => state.currency);

  const isIncome = transaction.type === 'income';
  const meta = getCategoryMeta(transaction.category);
  const IconComponent = ICON_COMPONENTS[meta.icon] || Tag;

  return (
    <div className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/60 hover:border-slate-700/80 transition-all duration-200">
      {/* Left info */}
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Category Icon */}
        <div className={`p-2.5 rounded-xl border shrink-0 ${meta.color}`}>
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        {/* Title & Date */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-100 truncate tracking-tight">
              {transaction.title}
            </h4>
            <Badge size="xs" variant={isIncome ? 'income' : 'default'} className="hidden sm:inline-flex">
              {transaction.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-400">{formatDate(transaction.date)}</span>
            {transaction.notes && (
              <>
                <span className="text-slate-600 text-xs">•</span>
                <span className="text-xs text-slate-400 truncate max-w-[180px] sm:max-w-xs">
                  {transaction.notes}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right amount & delete */}
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <div className="text-right">
          <p
            className={`text-sm sm:text-base font-bold tracking-tight ${
              isIncome ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
          </p>
          <span className="text-[10px] uppercase font-medium text-slate-400 sm:hidden">
            {transaction.category}
          </span>
        </div>

        <button
          type="button"
          onClick={() => deleteTransaction(transaction.id)}
          title="Delete transaction"
          className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-150"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
