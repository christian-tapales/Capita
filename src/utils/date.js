/**
 * Date formatting and comparison utilities
 */

export function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatShortDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function isCurrentMonth(dateString) {
  if (!dateString) return false;
  const today = new Date();
  const [year, month] = dateString.split('-').map(Number);
  return today.getFullYear() === year && today.getMonth() + 1 === month;
}

export function isCurrentYear(dateString) {
  if (!dateString) return false;
  const today = new Date();
  const [year] = dateString.split('-').map(Number);
  return today.getFullYear() === year;
}

export function isWithinLastNDays(dateString, days = 30) {
  if (!dateString) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}

