import { roundCurrency } from './currency';

/**
 * Exports complete application financial state to a downloadable JSON file.
 * @param {Object} state - Current Zustand state
 */
export function exportStateToJson(state) {
  const payload = {
    version: 1,
    app: 'Capita',
    exportedAt: new Date().toISOString(),
    data: {
      transactions: state.transactions || [],
      monthlyBudget: state.monthlyBudget || 3000,
      currency: state.currency || 'USD',
      theme: state.theme || 'dark',
    },
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `capita-backup-${dateStr}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validates and parses a raw JSON string from a backup file.
 * @param {string} jsonString - The raw string content of uploaded JSON file
 * @returns {{ isValid: boolean, data?: Object, error?: string }}
 */
export function validateAndParseBackupJson(jsonString) {
  if (!jsonString || typeof jsonString !== 'string') {
    return { isValid: false, error: 'File content is empty or invalid.' };
  }

  try {
    const parsed = JSON.parse(jsonString);

    // Support both direct state object or wrapped payload { data: { ... } }
    const sourceData = parsed.data && typeof parsed.data === 'object' ? parsed.data : parsed;

    if (!Array.isArray(sourceData.transactions)) {
      return {
        isValid: false,
        error: 'Invalid backup format: missing transactions array.',
      };
    }

    // Validate and sanitize each transaction item
    const sanitizedTransactions = [];
    for (let i = 0; i < sourceData.transactions.length; i++) {
      const tx = sourceData.transactions[i];

      if (!tx || typeof tx !== 'object') {
        return {
          isValid: false,
          error: `Transaction at index ${i} is invalid.`,
        };
      }

      if (!tx.title || typeof tx.title !== 'string') {
        return {
          isValid: false,
          error: `Transaction at index ${i} is missing a valid title.`,
        };
      }

      const amount = Number(tx.amount);
      if (isNaN(amount) || amount < 0) {
        return {
          isValid: false,
          error: `Transaction "${tx.title}" has an invalid amount (${tx.amount}).`,
        };
      }

      sanitizedTransactions.push({
        id: tx.id || `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: tx.title.trim(),
        amount: roundCurrency(amount),
        type: tx.type === 'income' ? 'income' : 'expense',
        category: tx.category || (tx.type === 'income' ? 'Salary' : 'Other Expense'),
        date: tx.date || new Date().toISOString().split('T')[0],
        notes: typeof tx.notes === 'string' ? tx.notes.trim() : '',
        createdAt: typeof tx.createdAt === 'number' ? tx.createdAt : Date.now(),
      });
    }

    return {
      isValid: true,
      data: {
        transactions: sanitizedTransactions,
        monthlyBudget:
          typeof sourceData.monthlyBudget === 'number' && sourceData.monthlyBudget > 0
            ? roundCurrency(sourceData.monthlyBudget)
            : 3000,
        currency: typeof sourceData.currency === 'string' ? sourceData.currency : 'USD',
        theme: sourceData.theme === 'light' ? 'light' : 'dark',
      },
    };
  } catch (err) {
    return {
      isValid: false,
      error: `JSON parsing failed: ${err.message}`,
    };
  }
}
