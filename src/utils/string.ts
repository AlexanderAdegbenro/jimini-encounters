/**
 * Formats a snake_case or lowercase string into Title Case.
 * Handles multiple underscores and mixed casing.
 * Example: 'therapy_session' -> 'Therapy Session'
 */
export const formatLabel = (str: string): string => {
  if (!str) return '—';
  return str
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
