import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  children,
  className,
  title,
  subtitle,
  action,
  ...props
}) {
  return (
    <div
      className={cn(
        "bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/20 transition-all duration-200",
        className
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/60">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-100 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
