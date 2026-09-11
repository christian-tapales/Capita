import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { StatCard } from './StatCard';
import { formatCurrency } from '../../utils/currency';
import { Wallet, ArrowDownLeft, ArrowUpRight, PiggyBank } from 'lucide-react';

export function SummaryCards() {
  const currency = useFinanceStore((state) => state.currency);
  const getTotalBalance = useFinanceStore((state) => state.getTotalBalance);
  const getTotalIncome = useFinanceStore((state) => state.getTotalIncome);
  const getTotalExpenses = useFinanceStore((state) => state.getTotalExpenses);
  const getSavingsRate = useFinanceStore((state) => state.getSavingsRate);
  const transactions = useFinanceStore((state) => state.transactions);

  const balance = getTotalBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const savingsRate = getSavingsRate();

  const expenseCount = transactions.filter((t) => t.type === 'expense').length;
  const incomeCount = transactions.filter((t) => t.type === 'income').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard
        title="Total Balance"
        amount={formatCurrency(balance, currency)}
        subtitle={`From ${transactions.length} total transactions`}
        icon={Wallet}
        colorScheme="indigo"
      />

      <StatCard
        title="Total Income"
        amount={formatCurrency(income, currency)}
        subtitle={`${incomeCount} income source${incomeCount === 1 ? '' : 's'}`}
        icon={ArrowDownLeft}
        colorScheme="emerald"
      />

      <StatCard
        title="Total Expenses"
        amount={formatCurrency(expenses, currency)}
        subtitle={`${expenseCount} expense item${expenseCount === 1 ? '' : 's'}`}
        icon={ArrowUpRight}
        colorScheme="rose"
      />

      <StatCard
        title="Net Savings Rate"
        amount={`${savingsRate}%`}
        subtitle={savingsRate > 20 ? '🎉 Excellent savings habit' : '💡 Aim for 20%+ target'}
        icon={PiggyBank}
        colorScheme="amber"
      />
    </div>
  );
}
