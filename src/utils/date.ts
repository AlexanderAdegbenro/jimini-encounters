/**
 * Date formatting for encounter dates.
 * Parses API values safely (ISO string or timestamp) and formats for list/detail UX.
 */

const FALLBACK = '—';

/**
 * Parses encounter date from API (ISO string, timestamp, or Date). Returns null if invalid.
 */
export function parseEncounterDate(value: string | number | Date): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === 'number') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value !== 'string') return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isToday(d: Date): boolean {
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
};

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

/**
 * Formats encounter date for list rows. Shows "Today, 2:30 PM" when the date is today.
 */
export function formatEncounterDate(value: string | number | Date): string {
  const d = parseEncounterDate(value);
  if (!d) return FALLBACK;
  if (isToday(d)) {
    return `Today, ${d.toLocaleTimeString(undefined, timeOptions)}`;
  }
  return d.toLocaleDateString(undefined, dateOptions);
}

/**
 * Formats encounter date for detail view (full date and time).
 */
export function formatEncounterDateTime(value: string | number | Date): string {
  const d = parseEncounterDate(value);
  if (!d) return FALLBACK;
  if (isToday(d)) {
    return `Today, ${d.toLocaleTimeString(undefined, timeOptions)}`;
  }
  return `${d.toLocaleDateString(undefined, dateOptions)}, ${d.toLocaleTimeString(undefined, timeOptions)}`;
}
