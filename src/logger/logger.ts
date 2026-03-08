const REDACTED = '[REDACTED]';

const SENSITIVE_KEYS = new Set([
  'patientId',
  'patientName',
  'notes',
  'ssn',
  'dateOfBirth',
  'email',
  'phone',
  'address',
]);

function redact(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(redact);
  }
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lower = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.has(key) || SENSITIVE_KEYS.has(lower);
    out[key] = isSensitive ? REDACTED : redact(value);
  }
  return out;
}

function safeSerialize(...args: unknown[]): unknown[] {
  return args.map((arg) =>
    typeof arg === 'object' && arg !== null ? redact(arg) : arg
  );
}

export const logger = {
  debug: (...args: unknown[]) => {
    console.debug(...safeSerialize(...args));
  },
  log: (...args: unknown[]) => {
    console.log(...safeSerialize(...args));
  },
  warn: (...args: unknown[]) => {
    console.warn(...safeSerialize(...args));
  },
  error: (...args: unknown[]) => {
    console.error(...safeSerialize(...args));
  },
};
