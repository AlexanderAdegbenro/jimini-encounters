# Patient Encounter List – Jimini Health

A React Native (Expo) app that displays a paginated list of patient encounters and their details, with PHI-aware logging and error handling.

---

## Setup & Running

- **Prerequisites:** Node.js (LTS), npm or yarn.
- **Install:** `npm install`
- **Start:** `npm start` then choose iOS/Android/Web.
- **Run tests:** `npm test`

No environment variables or backend are required; the app uses in-memory mock data behind the API layer.

---

## Tech Stack Choices

| Area | Choice | Rationale |
|------|--------|-----------|
| Framework | React Native (Expo SDK 55) | Single codebase for iOS/Android, fast iteration. |
| State / server state | TanStack React Query v5 | Caching, loading/error states, infinite scroll and refetch out of the box. |
| Lists | @shopify/flash-list | Performant list for large datasets, recycling and stable scroll. |
| Navigation | React Navigation 7 (native stack) | Standard RN navigation with type-safe params. |
| UI | Functional components, Pressable, SafeAreaProvider | Accessibility and platform-appropriate touch feedback. |

---

## Design Decisions

- **React Query:** All encounter data is loaded via `useInfiniteQuery` (list) and `useQuery` (detail). This centralizes loading/error/refetch behavior, avoids ad-hoc loading state, and gives consistent cache keys (e.g. `['encounters']`, `['encounter', id]`) for future invalidation or prefetching.
- **FlashList:** Used for the encounter list to keep scroll smooth with large datasets. `EncounterRow` is wrapped in `React.memo` and `renderItem` uses a stable, memoized callback (`handlePress` passed by reference) so list items don’t re-render unnecessarily and the list doesn’t jitter.
- **API abstraction:** All server/backend access goes through `src/api/client.ts`. The app never imports mock or HTTP logic from screens; swapping to a real backend later is a single-module change. The API layer uses the project logger for any debug logs so PHI is never written in plain form (see PHI/PII section).

---

## PHI/PII Handling

- **Redaction logger:** `src/logger/logger.ts` exposes `logger.debug`, `logger.log`, `logger.warn`, and `logger.error`. Before anything is passed to `console.*`, objects are run through a redaction function that replaces known sensitive keys (e.g. `patientId`, `patientName`, `notes`, `ssn`, `dateOfBirth`, `email`, `phone`, `address`) with `[REDACTED]`. Nested objects and arrays are redacted recursively.
- **API layer:** The API client is the only place that should log request/response or debug data. It imports and uses `logger` from `src/logger/logger.ts` only (e.g. `logger.debug('Fetching encounters', { page, pageSize })`). No raw `console.log` of request/response or any object that might contain `patientId` or `notes` is used in the API or elsewhere in the app.
- **UI constraints:** The list shows only non-identifying fields (e.g. initials, encounter type, date, status). Full notes and other PHI are shown only on the detail screen after navigation, keeping the list safe for shoulder surfing and screenshots.

---

## Testing Philosophy

- **Utils (e.g. date):** Date parsing and formatting are critical for correct display and for handling invalid API values. `src/utils/__tests__/date.test.ts` covers `parseEncounterDate` (valid/invalid inputs), `formatEncounterDate` (“Today” vs date fallback, invalid → `—`), and `formatEncounterDateTime`, so regressions in formatting or fallbacks are caught without running the full app.
- **Component interactions (e.g. ErrorState):** User-facing behavior like “Retry” is tested with `@testing-library/react-native`. `ErrorState.test.tsx` checks that the Retry button is present and that pressing it calls the `onRetry` callback. This validates the contract between UI and parent (list/detail/error boundary) without relying on E2E.

Jest is configured with `jest-expo`, and a small mock for `expo/src/winter` is used so the test run avoids the Jest 30 “import outside of scope” issue while still exercising our code.

---

## Time Breakdown

| Phase | Time |
|-------|------|
| Setup (Expo, deps, navigation) | _e.g. 1–2h_ |
| API abstraction + types | _e.g. 0.5h_ |
| List screen (infinite list, loading/error/empty) | _e.g. 1–2h_ |
| Detail screen | _e.g. 0.5–1h_ |
| Date utils + PHI logger | _e.g. 0.5h_ |
| Error boundary + polish (memo, stable callbacks) | _e.g. 0.5h_ |
| Tests + README + final checks | _e.g. 1h_ |

_Adjust the estimates above to match your actual time spent._
