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

| Phase | Estimated Time | Git Timestamp Reference |
|-------|----------------|-------------------------|
| Setup & Architecture | 1h | Mar 7, 18:31 – 19:18 |
| API, State & Core UI | 1.5h | Mar 8, 14:06 – 14:30 |
| Stability & Optimizations | 1h | Mar 8, 14:30 – 14:58 |
| Brand Polish & Testing | 0.5h | Mar 8, 14:58 – 15:20 |
| **Total Work Time** | **~4 Hours** | — |

**Note:** Time breakdown is approximate. Work was split across two sessions to prioritize architectural planning on Day 1 and high-leverage UI/UX implementation on Day 2.

---

## Trade-offs & Future Improvements

- **Data Persistence:** Currently, the app relies on in-memory caching via React Query. For a production healthcare app, I would implement persistent storage (e.g., react-native-mmkv with a React Query persister) to allow clinicians to access data offline in low-connectivity hospital areas.

- **Security & Error Tracking:** While I've implemented a PHI-aware logger, a production app would integrate Sentry. I would utilize a `beforeSend` hook to run our redaction logic on all breadcrumbs and error reports before they leave the device.

- **API Validation:** To harden the boundary between the API and the UI, I would implement Zod or io-ts to validate response shapes at runtime. This ensures that if a backend schema changes, the app fails gracefully with a clear error rather than an undefined crash.
