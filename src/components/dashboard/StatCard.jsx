import React from 'react';
import { cn } from '../../utils/cn';

export function StatCard({
  title,
  amount,
  subtitle,
  icon: Icon,
  colorScheme = 'indigo', // 'indigo' | 'emerald' | 'rose' | 'amber'
}) {
  const colorMap = {
    indigo: {
      bg: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
      border: 'border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/15 text-indigo-400',
      text: 'text-indigo-400',
    },
    emerald: {
      bg: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      text: 'text-emerald-400',
    },
    rose: {
      bg: 'from-rose-500/10 via-rose-500/5 to-transparent',
      border: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/15 text-rose-400',
      text: 'text-rose-400',
    },
    amber: {
      bg: 'from-amber-500/10 via-amber-500/5 to-transparent',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/15 text-amber-400',
      text: 'text-amber-400',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.indigo;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-slate-900/80 backdrop-blur-md border transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl",
        scheme.border
      )}
    >
      {/* Subtle top glow gradient */}
      <div className={cn("absolute inset-x-0 top-0 h-16 bg-gradient-to-b opacity-40 pointer-events-none", scheme.bg)} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{title}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">{amount}</h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={cn("p-3 rounded-xl", scheme.iconBg)}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
