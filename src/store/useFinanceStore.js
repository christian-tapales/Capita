import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { INITIAL_TRANSACTIONS } from '../utils/seedData';
import { roundCurrency, safeSum } from '../utils/currency';
import { isCurrentMonth } from '../utils/date';

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: INITIAL_TRANSACTIONS,
      currency: 'USD',
      monthlyBudget: 3500,
      theme: 'dark',

      // Actions
      addTransaction: (transaction) => {
        const newTransaction = {
          id: transaction.id || `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          title: transaction.title.trim(),
          amount: roundCurrency(Number(transaction.amount)),
          type: transaction.type || 'expense',
          category: transaction.category || (transaction.type === 'income' ? 'Salary' : 'Other Expense'),
          date: transaction.date || new Date().toISOString().split('T')[0],
          notes: transaction.notes?.trim() || '',
          createdAt: transaction.createdAt || Date.now(),
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        }));
      },

      updateTransaction: (id, updatedFields) => {
        set((state) => ({
          transactions: state.transactions.map((tx) => {
            if (tx.id === id) {
              return {
                ...tx,
                ...updatedFields,
                amount: updatedFields.amount !== undefined ? roundCurrency(Number(updatedFields.amount)) : tx.amount,
              };
            }
            return tx;
          }),
        }));
      },

      resetToSampleData: () => {
        set({ transactions: INITIAL_TRANSACTIONS });
      },

      clearAllTransactions: () => {
        set({ transactions: [] });
      },

      importBackupData: (backupData) => {
        if (!backupData || !Array.isArray(backupData.transactions)) return;
        set({
          transactions: backupData.transactions,
          monthlyBudget: backupData.monthlyBudget || 3000,
          currency: backupData.currency || 'USD',
          theme: backupData.theme || 'dark',
        });
      },

      batchAddTransactions: (newTransactions) => {
        if (!Array.isArray(newTransactions)) return;
        set((state) => ({
          transactions: [...newTransactions, ...state.transactions],
        }));
      },

      setCurrency: (currency) => {
        set({ currency });
      },

      setMonthlyBudget: (monthlyBudget) => {
        set({ monthlyBudget: roundCurrency(Number(monthlyBudget)) });
      },

      setTheme: (theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        }));
      },

      // Selectors & Computed Metrics
      getTotalIncome: () => {
        const incomeAmounts = get().transactions
          .filter((tx) => tx.type === 'income')
          .map((tx) => tx.amount);
        return safeSum(incomeAmounts);
      },

      getTotalExpenses: () => {
        const expenseAmounts = get().transactions
          .filter((tx) => tx.type === 'expense')
          .map((tx) => tx.amount);
        return safeSum(expenseAmounts);
      },

      getTotalBalance: () => {
        const income = get().getTotalIncome();
        const expenses = get().getTotalExpenses();
        return roundCurrency(income - expenses);
      },

      getCurrentMonthIncome: () => {
        const incomeAmounts = get().transactions
          .filter((tx) => tx.type === 'income' && isCurrentMonth(tx.date))
          .map((tx) => tx.amount);
        return safeSum(incomeAmounts);
      },

      getCurrentMonthExpenses: () => {
        const expenseAmounts = get().transactions
          .filter((tx) => tx.type === 'expense' && isCurrentMonth(tx.date))
          .map((tx) => tx.amount);
        return safeSum(expenseAmounts);
      },

      getSavingsRate: () => {
        const income = get().getTotalIncome();
        const expenses = get().getTotalExpenses();
        if (income <= 0) return 0;
        const rate = ((income - expenses) / income) * 100;
        return Math.max(0, Math.round(rate * 10) / 10);
      },
    }),
    {
      name: 'capita-finance-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
