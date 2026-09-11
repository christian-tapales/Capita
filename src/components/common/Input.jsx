import React from 'react';
import { cn } from '../../utils/cn';

export function Input({
  label,
  error,
  icon: Icon,
  className,
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:bg-slate-950",
            Icon && "pl-10",
            error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
    </div>
  );
}
