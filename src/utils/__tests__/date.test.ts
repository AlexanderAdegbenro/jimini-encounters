import {
  parseEncounterDate,
  formatEncounterDate,
  formatEncounterDateTime,
} from '../date';

describe('date utils', () => {
  describe('parseEncounterDate', () => {
    it('returns Date for valid ISO string', () => {
      const d = parseEncounterDate('2025-03-01T14:30:00.000Z');
      expect(d).toBeInstanceOf(Date);
      expect(d?.getTime()).toBe(new Date('2025-03-01T14:30:00.000Z').getTime());
    });

    it('returns Date for valid timestamp number', () => {
      const ts = 1740832200000;
      const d = parseEncounterDate(ts);
      expect(d).toBeInstanceOf(Date);
      expect(d?.getTime()).toBe(ts);
    });

    it('returns same Date when given Date instance', () => {
      const input = new Date('2025-01-15T10:00:00.000Z');
      const d = parseEncounterDate(input);
      expect(d).toBe(input);
    });

    it('returns null for invalid string', () => {
      expect(parseEncounterDate('not-a-date')).toBeNull();
      expect(parseEncounterDate('')).toBeNull();
    });

    it('returns null for invalid number (NaN)', () => {
      expect(parseEncounterDate(Number.NaN)).toBeNull();
    });

    it('returns null for invalid Date instance', () => {
      expect(parseEncounterDate(new Date('invalid'))).toBeNull();
    });

    it('returns null for non-string/non-number non-Date', () => {
      expect(parseEncounterDate(null as unknown as string)).toBeNull();
      expect(parseEncounterDate(undefined as unknown as string)).toBeNull();
    });
  });

  describe('formatEncounterDate', () => {
    it('returns fallback "—" for invalid date', () => {
      expect(formatEncounterDate('invalid')).toBe('—');
      expect(formatEncounterDate(Number.NaN)).toBe('—');
      expect(formatEncounterDate('')).toBe('—');
    });

    it('formats non-today date as locale date (e.g. "Mar 1, 2025")', () => {
      const result = formatEncounterDate('2025-03-01T14:30:00.000Z');
      expect(result).not.toBe('—');
      expect(result).not.toMatch(/^Today,/);
      expect(result).toMatch(/Mar|Mar\.|March/);
      expect(result).toMatch(/1/);
      expect(result).toMatch(/2025/);
    });

    it('formats today as "Today, <time>"', () => {
      const today = new Date();
      const iso = today.toISOString();
      const result = formatEncounterDate(iso);
      expect(result).not.toBe('—');
      expect(result).toMatch(/^Today,/);
      expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/i);
    });
  });

  describe('formatEncounterDateTime', () => {
    it('returns fallback "—" for invalid date', () => {
      expect(formatEncounterDateTime('invalid')).toBe('—');
      expect(formatEncounterDateTime(Number.NaN)).toBe('—');
    });

    it('formats non-today with full date and time', () => {
      const result = formatEncounterDateTime('2025-03-01T14:30:00.000Z');
      expect(result).not.toBe('—');
      expect(result).toMatch(/2025/);
      expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/i);
    });

    it('formats today as "Today, <time>"', () => {
      const today = new Date();
      const result = formatEncounterDateTime(today.toISOString());
      expect(result).toMatch(/^Today,/);
      expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/i);
    });
  });
});
