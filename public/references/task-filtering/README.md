# Task filtering reference

These files complete the [task-filtering lesson](https://expo-developer-guide.thally.app/guides/task-filtering). They are source references, not another application: use the existing packages and settings in `examples/expo-task-starter/`.

## Apply the files

Start from the working unfiltered starter after the quickstart. Save or copy the complete files, removing only the final `.txt` extension:

| Reference | Destination inside the starter |
| --- | --- |
| [App.tsx.txt](App.tsx.txt) | `App.tsx` |
| [Filtering.test.tsx.txt](Filtering.test.tsx.txt) | `__tests__/Filtering.test.tsx` |

Keep `__tests__/App.test.tsx` and every package/configuration file unchanged. Replacing the screen skips stages 1–3. The test file contains four filtering tests; together with the original four tests, the result is two suites and eight tests.

From `examples/expo-task-starter/`, run:

```sh
npm run typecheck
npm run lint
npm test
```

Use `npm start` to check the app on your phone. In PowerShell, use `npm.cmd` if needed. Automated tests use mocked native modules; device layout, screen-reader announcements, and focus still need manual checks.

## Follow the testing checkpoints

The guide first provides the initial-selection test in full (five total tests). It then adds imports/helpers and the named matching-view test from this reference (six), followed by the two transition/empty-state tests (eight). Do not append duplicate imports, helpers, or tests.

## Maintain the reference

When the guide or starter changes, reapply the instructions to an isolated starter copy. Check each intermediate state, then compare the completed files with these references and rerun TypeScript, lint, all eight tests, and Android/iOS exports. The `.txt` extensions keep downloadable source out of the documentation build’s TypeScript and test discovery.
