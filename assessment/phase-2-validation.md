# Phase 2 validation

## What changed

The single-screen example lives in `examples/expo-task-starter/`. It was
generated with the official `create-expo-app` blank TypeScript SDK 58 template.
It has its own npm dependencies, lockfile, TypeScript, ESLint, and Jest setup.
There is no npm workspace or shared React dependency with Thally.

The starting app has three deterministic tasks and reversible completion
toggles. It uses functional state updates, stable IDs, native checkbox
accessibility semantics, and safe-area insets. Filtering and persistence are
deliberately absent. Task rows grow with their text and the list can scroll.

The only root tooling changes exclude this example from Thally's TypeScript
and ESLint checks. The root README now distinguishes the app and documentation
commands. No root dependency, lockfile, content page, site configuration, or
generated framework source was changed.

Locked versions: Expo `58.0.26`, React `19.3.0`, React Native `0.88.1`,
safe-area context `5.11.1`, Expo status bar `58.0.5`, TypeScript `6.0.3`,
Jest `30.5.2`, jest-expo `58.0.15`, React Native Jest preset `0.88.1`,
React Native Testing Library `14.1.0`, ESLint `9.39.5`, and Expo lint config
`58.0.4`. The checked environment used Node.js `22.16.0` and npm `10.9.2`.

## Tooling findings

- The first npm install failed with an npm registry idle timeout. Retrying
  with `--fetch-retries=3 --maxsockets=3` completed successfully.
- The first TypeScript run caught missing Jest globals. Adding `jest` to the
  example's TypeScript `types` array resolved it.
- Expo's installation selected ESLint 10, but the installed React plugin only
  supports ESLint through 9. The example pins ESLint `9.39.5`. That version
  emits a deprecation warning, but works with the current Expo lint config.
- `jest-expo@58.0.15` requires React Native's newly separate Jest preset.
  Installing `@react-native/jest-preset@0.88.1` resolved the initial test setup
  failure. Jest and lint tooling are all development dependencies.
- The generated Claude plugin settings file was omitted; running the example
  does not require enabling an editor plugin.

## Checks completed

| Check | Result |
| --- | --- |
| Final `npm ci --no-fund` | Passed from the corrected lockfile; 1,131 packages installed |
| Example TypeScript | Passed after adding Jest types |
| Example lint | Passed with ESLint 9 |
| Behavior tests | One suite, four tests passed; no snapshots |
| `npx expo install --check` | Dependencies up to date |
| `npx expo config --type public` | Valid Task starter configuration, SDK 58 |
| `npx --yes expo-doctor@latest` | 20/20 checks passed |
| Android production export | Passed, 603 modules, Hermes bundle generated |
| iOS production export | Passed, 605 modules, Hermes bundle generated |
| Development server | Metro started on port 8081 |
| Android and iOS development manifests | HTTP 200, SDK 58, Task starter name and launch asset present |
| Root Thally TypeScript | Passed |
| Root Thally content check | Zero errors and warnings |
| Root Thally production build | Passed, 57 pages generated |

The clean install was followed by another successful TypeScript, lint, and
four-test run. Plain `npm start` was also checked after that install. Server
checks used noninteractive `CI=1` execution, which disables Metro watch/reload
behavior; interactive QR scanning, Fast Refresh, and phone connectivity remain
part of the manual checks. Temporary Metro servers were stopped after checking.

Tests cover initial accessible checkbox states, toggling in both directions,
visible status text, independent task updates, and consecutive presses batched
inside React's test `act` boundary. Tests use the Expo preset and safe-area
mocks; they do not execute native code.

## Remaining limitations and warnings

Android and iOS device and simulator execution remain unverified. Neither
Android emulator tooling nor an iOS simulator was available in the inspected
Windows environment. The example README contains separate Expo Go instructions
and a manual checklist for both phones, including large text and screen readers.
Bundle generation and mocked component tests are not physical-device tests.

The example's npm audit reports 20 moderate package findings and no high or
critical findings. The affected package entries are `@expo/fingerprint`,
`@jest/core`, `@jest/expect`, `@jest/globals`, `@jest/reporters`, `@jest/transform`,
`babel-jest`, `babel-plugin-istanbul`, `expo`, `glob`, `jest`, `jest-circus`,
`jest-cli`, `jest-config`, `jest-resolve-dependencies`, `jest-runner`,
`jest-runtime`, `jest-snapshot`, `minimatch`, and `test-exclude`.
These include dependency-chain effects, not 20 demonstrated exploit paths.
npm suggests incompatible downgrades for some fixes, including Expo 52 and
Jest 29. No forced upgrades or downgrades were applied.

Installation also reports transitive deprecations for `whatwg-encoding`,
`glob`, and `inflight`, plus the pinned ESLint warning. Metro workers report
that `FORCE_COLOR` overrides `NO_COLOR` in this execution environment; this
did not prevent either bundle from being generated.

Thally retains its previously documented audit findings, optional embedding
skip, and middleware deprecation warning. See `assessment/setup-notes.md`.
No GitHub push or documentation deployment was performed for Phase 2.
