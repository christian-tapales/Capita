import { roundCurrency, safeSum } from './currency';
import { getCategoryMeta } from './categories';
import { isCurrentMonth } from './date';

/**
 * Aggregates expense transactions by category.
 * @param {Array} transactions
 * @param {'all'|'month'} timeRange
 * @returns {Array<{ name: string, value: number, percentage: number, color: string, icon: string }>}
 */
export function getExpenseCategoryBreakdown(transactions, timeRange = 'all') {
  if (!transactions || transactions.length === 0) return [];

  // Filter expenses and apply time range
  const filtered = transactions.filter((tx) => {
    if (tx.type !== 'expense') return false;
    if (timeRange === 'month') return isCurrentMonth(tx.date);
    return true;
  });

  if (filtered.length === 0) return [];

  // Group by category
  const categoryMap = new Map();

  filtered.forEach((tx) => {
    const cat = tx.category || 'Other Expense';
    const currentList = categoryMap.get(cat) || [];
    categoryMap.set(cat, [...currentList, tx.amount]);
  });

  // Calculate total expense
  const totalExpense = safeSum(filtered.map((tx) => tx.amount));

  // Build breakdown list
  const breakdown = [];
  categoryMap.forEach((amounts, categoryName) => {
    const catTotal = safeSum(amounts);
    const meta = getCategoryMeta(categoryName);
    const percentage = totalExpense > 0 ? Math.round((catTotal / totalExpense) * 1000) / 10 : 0;

    breakdown.push({
      name: categoryName,
      value: catTotal,
      percentage,
      color: meta.hexColor || '#64748b',
      icon: meta.icon,
    });
  });

  // Sort by highest spending first
  return breakdown.sort((a, b) => b.value - a.value);
}

/**
 * Aggregates income and expense cash flow over the last N months.
 * @param {Array} transactions
 * @param {number} monthsCount
 * @returns {Array<{ monthKey: string, label: string, income: number, expense: number, net: number }>}
 */
export function getMonthlyCashflowTrends(transactions, monthsCount = 6) {
  const result = [];
  const now = new Date();

  // Generate list of the last N months in chronological order
  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const monthKey = `${year}-${month}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    result.push({
      monthKey,
      label,
      income: 0,
      expense: 0,
      net: 0,
    });
  }

  if (!transactions || transactions.length === 0) {
    return result;
  }

  // Aggregate transactions into respective month buckets
  const monthMap = new Map(result.map((m) => [m.monthKey, { ...m, incomeList: [], expenseList: [] }]));

  transactions.forEach((tx) => {
    if (!tx.date) return;
    const key = tx.date.substring(0, 7); // 'YYYY-MM'
    if (monthMap.has(key)) {
      const bucket = monthMap.get(key);
      if (tx.type === 'income') {
        bucket.incomeList.push(tx.amount);
      } else if (tx.type === 'expense') {
        bucket.expenseList.push(tx.amount);
      }
    }
  });

  // Calculate safe totals and net flow
  return result.map((item) => {
    const bucket = monthMap.get(item.monthKey);
    const income = safeSum(bucket.incomeList);
    const expense = safeSum(bucket.expenseList);
    const net = roundCurrency(income - expense);

    return {
      monthKey: item.monthKey,
      label: item.label,
      income,
      expense,
      net,
    };
  });
}
