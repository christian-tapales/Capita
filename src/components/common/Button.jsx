import React from 'react';
import { cn } from '../../utils/cn';

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 focus-visible:ring-indigo-500 focus-visible:ring-offset-slate-950",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 focus-visible:ring-slate-400 focus-visible:ring-offset-slate-950",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 focus-visible:ring-emerald-500 focus-visible:ring-offset-slate-950",
    danger: "bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 focus-visible:ring-rose-500 focus-visible:ring-offset-slate-950",
    ghost: "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 focus-visible:ring-slate-400",
    outline: "border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white bg-transparent",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-5 py-3 gap-2.5",
    icon: "p-2",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
