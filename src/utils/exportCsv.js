/**
 * Escapes CSV field value to handle commas, newlines, and double quotes safely.
 * @param {string|number} value
 * @returns {string}
 */
function escapeCsvValue(value) {
  if (value === null || value === undefined) return '""';
  const stringValue = String(value);
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return `"${stringValue}"`;
}

/**
 * Generates and triggers browser download of an RFC-4180 compliant CSV file of transactions.
 * @param {Array} transactions - Array of transaction objects
 * @param {string} currencyCode - Current active currency code (e.g. 'USD')
 * @param {string} [customFileName] - Optional custom file name
 */
export function exportTransactionsToCSV(transactions, currencyCode = 'USD', customFileName) {
  if (!transactions || transactions.length === 0) {
    throw new Error('No transactions available to export.');
  }

  const headers = ['ID', 'Date', 'Type', 'Category', 'Title', 'Amount', 'Currency', 'Notes'];

  const rows = transactions.map((tx) => [
    escapeCsvValue(tx.id || ''),
    escapeCsvValue(tx.date || ''),
    escapeCsvValue(tx.type || 'expense'),
    escapeCsvValue(tx.category || ''),
    escapeCsvValue(tx.title || ''),
    escapeCsvValue(tx.amount !== undefined ? tx.amount.toFixed(2) : '0.00'),
    escapeCsvValue(currencyCode),
    escapeCsvValue(tx.notes || ''),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const today = new Date().toISOString().split('T')[0];
  const filename = customFileName || `capita-transactions-${today}.csv`;

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
