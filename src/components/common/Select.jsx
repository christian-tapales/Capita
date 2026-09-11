import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  error,
  options = [],
  className,
  id,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={selectId}
          className={cn(
            "w-full appearance-none bg-slate-900 border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 pr-10 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:bg-slate-950 cursor-pointer",
            error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt.id ?? opt} value={opt.value ?? opt.id ?? opt} className="bg-slate-900 text-slate-100">
              {opt.label ?? opt.name ?? opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 w-4 h-4 pointer-events-none text-slate-400" />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
    </div>
  );
}
