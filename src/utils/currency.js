/**
 * Currency and precision math helpers to prevent floating-point errors
 */

export const CURRENCY_MAP = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  PHP: { symbol: '₱', name: 'Philippine Peso', locale: 'en-PH' },
  CAD: { symbol: 'CA$', name: 'Canadian Dollar', locale: 'en-CA' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  AUD: { symbol: 'AU$', name: 'Australian Dollar', locale: 'en-AU' },
};

/**
 * Safely rounds a currency number to 2 decimal places to avoid floating point anomalies (e.g. 0.1 + 0.2 = 0.30000000000000004)
 * @param {number} amount 
 * @returns {number}
 */
export function roundCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 0;
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

/**
 * Safely sum an array of numbers with two-decimal precision
 * @param {number[]} numbers 
 * @returns {number}
 */
export function safeSum(numbers) {
  if (!Array.isArray(numbers)) return 0;
  const total = numbers.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
  return roundCurrency(total);
}

/**
 * Formats an amount to localized currency string
 * @param {number} amount 
 * @param {string} currencyCode 
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = 'USD') {
  const rounded = roundCurrency(amount);
  const currencyInfo = CURRENCY_MAP[currencyCode] || CURRENCY_MAP.USD;

  try {
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rounded);
  } catch {
    return `${currencyInfo.symbol}${rounded.toFixed(2)}`;
  }
}

/**
 * Formats an amount to compact format (e.g. $1.5k, $2M) for charts and compact UI
 * @param {number} amount 
 * @param {string} currencyCode 
 * @returns {string}
 */
export function formatCompactCurrency(amount, currencyCode = 'USD') {
  const currencyInfo = CURRENCY_MAP[currencyCode] || CURRENCY_MAP.USD;
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absAmount >= 1_000_000) {
    return `${sign}${currencyInfo.symbol}${(absAmount / 1_000_000).toFixed(1)}M`;
  }
  if (absAmount >= 1_000) {
    return `${sign}${currencyInfo.symbol}${(absAmount / 1_000).toFixed(1)}k`;
  }
  return `${sign}${currencyInfo.symbol}${absAmount.toFixed(0)}`;
}
