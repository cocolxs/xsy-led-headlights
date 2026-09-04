export function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEndOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function getDaysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dateRangeFromParams(
  dateFrom?: string,
  dateTo?: string,
): { from: Date; to: Date } | null {
  if (!dateFrom && !dateTo) return null;
  const from = dateFrom ? getStartOfDay(new Date(dateFrom)) : getDaysAgo(30);
  const to = dateTo ? getEndOfDay(new Date(dateTo)) : getEndOfDay(new Date());
  return { from, to };
}

export function safeToISOString(date: Date | string | null | undefined): string {
  if (!date) return '';
  if (typeof date === 'string') return date;
  return date.toISOString();
}
