import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useFinanceStore } from '../../store/useFinanceStore';
import { getExpenseCategoryBreakdown } from '../../utils/chartData';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common/Card';
import { PieChart as PieIcon, Calendar, Layers } from 'lucide-react';
import { cn } from '../../utils/cn';

// Custom tooltip component for Recharts
function CustomTooltip({ active, payload, currency }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl text-xs z-50 min-w-[140px]">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-semibold text-slate-200">{data.name}</span>
        </div>
        <div className="flex justify-between items-center text-slate-300 font-medium pt-1 border-t border-slate-800">
          <span>Amount:</span>
          <span className="font-bold text-slate-100">{formatCurrency(data.value, currency)}</span>
        </div>
        <div className="flex justify-between items-center text-slate-400 text-[11px] mt-0.5">
          <span>Share:</span>
          <span className="text-indigo-400 font-semibold">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
}

export function CategoryPieChart() {
  const [timeRange, setTimeRange] = useState('month'); // 'month' | 'all'
  const transactions = useFinanceStore((state) => state.transactions);
  const currency = useFinanceStore((state) => state.currency);

  const breakdown = useMemo(() => {
    return getExpenseCategoryBreakdown(transactions, timeRange);
  }, [transactions, timeRange]);

  const totalExpense = useMemo(() => {
    return breakdown.reduce((sum, item) => sum + item.value, 0);
  }, [breakdown]);

  return (
    <Card className="flex flex-col h-full">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Expense Breakdown</h3>
            <p className="text-xs text-slate-400">Spending distribution by category</p>
          </div>
        </div>

        {/* Time range selector */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setTimeRange('month')}
            className={cn(
              'px-2.5 py-1 rounded-md font-medium transition-all duration-150',
              timeRange === 'month'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => setTimeRange('all')}
            className={cn(
              'px-2.5 py-1 rounded-md font-medium transition-all duration-150',
              timeRange === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Chart Body or Empty State */}
      {breakdown.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-300">No expense data found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            {timeRange === 'month'
              ? 'No expense transactions recorded for the current month.'
              : 'Add an expense transaction to view category insights.'}
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
          {/* Donut Chart Container */}
          <div className="relative w-full md:w-1/2 h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={800}
                >
                  {breakdown.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={entry.color}
                      stroke="#0f172a"
                      strokeWidth={2}
                      className="transition-all duration-200 hover:opacity-80 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip currency={currency} />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Donut Summary Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total</span>
              <span className="text-sm font-bold text-slate-100 mt-0.5">
                {formatCurrency(totalExpense, currency)}
              </span>
            </div>
          </div>

          {/* Interactive Category Legend */}
          <div className="w-full md:w-1/2 flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
            {breakdown.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-slate-200 truncate" title={item.name}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs flex-shrink-0">
                  <span className="font-semibold text-slate-200">
                    {formatCurrency(item.value, currency)}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 w-10 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
