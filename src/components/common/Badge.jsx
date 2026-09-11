import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
  icon: Icon,
}) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700/50",
    income: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    expense: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    brand: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const sizes = {
    xs: "text-[10px] font-medium px-2 py-0.5 gap-1",
    sm: "text-xs font-medium px-2.5 py-1 gap-1.5",
    md: "text-sm font-medium px-3 py-1.5 gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border tracking-wide select-none",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
}
