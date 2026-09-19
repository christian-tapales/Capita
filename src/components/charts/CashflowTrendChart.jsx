import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { getMonthlyCashflowTrends } from '../../utils/chartData';
import { formatCurrency, formatCompactCurrency } from '../../utils/currency';
import { Card } from '../common/Card';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Custom Tooltip for Cashflow Bar Chart
function CustomTooltip({ active, payload, label, currency }) {
  if (active && payload && payload.length) {
    const incomeItem = payload.find((p) => p.dataKey === 'income');
    const expenseItem = payload.find((p) => p.dataKey === 'expense');

    const income = incomeItem ? incomeItem.value : 0;
    const expense = expenseItem ? expenseItem.value : 0;
    const net = income - expense;

    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-xl text-xs z-50 min-w-[160px]">
        <div className="font-semibold text-slate-200 mb-2 pb-1 border-b border-slate-800">
          {label}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Income:</span>
            </div>
            <span className="font-bold text-slate-100">{formatCurrency(income, currency)}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Expense:</span>
            </div>
            <span className="font-bold text-slate-100">{formatCurrency(expense, currency)}</span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-slate-800/80 font-medium">
            <span className="text-slate-400">Net Flow:</span>
            <span className={`font-bold ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {net >= 0 ? '+' : ''}{formatCurrency(net, currency)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function CashflowTrendChart() {
  const transactions = useFinanceStore((state) => state.transactions);
  const currency = useFinanceStore((state) => state.currency);

  const data = useMemo(() => {
    return getMonthlyCashflowTrends(transactions, 6);
  }, [transactions]);

  const hasActivity = useMemo(() => {
    return data.some((item) => item.income > 0 || item.expense > 0);
  }, [data]);

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Cash Flow Trends</h3>
            <p className="text-xs text-slate-400">6-Month Income vs Expense comparison</p>
          </div>
        </div>

        {/* Quick Legend Indicators */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span className="text-slate-400 font-medium">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
            <span className="text-slate-400 font-medium">Expense</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas or Empty State */}
      {!hasActivity ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
            <BarChart3 className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-300">No trend history available</p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Start adding income and expense transactions to see your multi-month cash flow trends.
          </p>
        </div>
      ) : (
        <div className="w-full h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(val) => formatCompactCurrency(val, currency)}
              />
              <Tooltip content={<CustomTooltip currency={currency} />} />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
                animationDuration={800}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
