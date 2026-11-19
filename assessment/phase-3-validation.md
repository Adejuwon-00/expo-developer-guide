# Phase 3 validation

## What changed

The documentation now follows one path: Introduction, Run the app on your
phone, and Build and test task filtering. The introduction and quickstart
keep their existing slugs. The practical guide is `guides/task-filtering`.

Eight unrelated sample MDX pages were removed, along with the sample
`openapi.yaml`. The plan counted seven sample pages, but inspection found
eight. Navigation now lists only the three Expo lessons. Both READMEs point
to the learning path and distinguish root Thally commands from Expo commands.

The committed Expo starter's source, tests, configuration, dependencies, and
lockfile are unchanged. No completed solution, new package, or generated
Thally runtime edit is part of this phase.

## Environment and sources

Checks ran on Windows with Node.js 22.16.0 and npm 10.9.2. PowerShell blocked
`npm.ps1` under the session's execution policy; `npm.cmd` and `npx.cmd` were
used to invoke the same installed tools. The quickstart documents that
workaround without asking readers to change system policy.

Official references reviewed during planning:

- [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/)
- [Expo's documentation index](https://docs.expo.dev/llms.txt)
- [Device development workflow](https://docs.expo.dev/get-started/start-developing/)
- [Environment setup](https://docs.expo.dev/get-started/set-up-your-environment/)
- [Expo testing](https://docs.expo.dev/develop/unit-testing/)
- [React Native accessibility](https://reactnative.dev/docs/accessibility)
- [FlatList](https://reactnative.dev/docs/flatlist)
- [Thally quickstart](https://docs.thally.io/quickstart)

The personal writing site and Thally's online component/customization pages
were inaccessible through the web tool. The writing follows the author's
stated preferences; it does not claim a fresh review of that website. The
installed MDX registry confirms support for the note component used here.
Thally validation and the production build checked the authored MDX.

## Clean installation and tutorial validation

A fresh clone of the actual GitHub repository was created outside the working
repository at `../phase-3-validation`. Its checked-out baseline was the pushed
Phase 2 state. From `examples/expo-task-starter`, `npm.cmd ci` passed: 1,131
packages installed, 1,132 audited, and 20 moderate findings. The install took
about seven minutes. No dependency fixes or lockfile changes were applied.

Temporary verification code extracted the guide's fenced snippets and applied
them to that checkout at the exact insertion points described in the text.
It inserted the filter type/options, selection and derived values, header
controls, styles, list data and empty component, then wrote the guide's full
`__tests__/Filtering.test.tsx` block. It asserted that insertion anchors were
unique. This tested the published snippets rather than a separately written
reference solution.

| Check | Result |
| --- | --- |
| Restored starter TypeScript, lint, and tests | Passed; one suite, four tests |
| Tutorial `npm.cmd run typecheck` | Passed |
| Tutorial `npm.cmd run lint` | Passed |
| Tutorial `npm.cmd test` | Two suites, eight tests passed; no snapshots |
| `npx.cmd expo install --check` | Dependencies up to date |
| `npx.cmd expo config --type public` | Task starter, SDK 58.0.0, Android and iOS |
| `npx.cmd expo export --platform android --output-dir dist-android` | Passed; 603 modules, Hermes bundle generated |
| `npx.cmd expo export --platform ios --output-dir dist-ios` | Passed; 605 modules, Hermes bundle generated |
| `npm.cmd start` | Metro started on port 8081 with `CI=1` |
| Android and iOS development manifests | HTTP 200; SDK 58.0.0, Task starter, launch asset present |

The eight tests include the original four starter tests and four new tests
for default selection, matching lists, accessible selected states, changing
membership while a filter is active, empty Active/Completed views, and
preserved task state after returning to All. TypeScript and lint also passed
in the same installation. The temporary solution was subsequently restored
to the original starter so its four-test baseline could be checked separately.

Metro's CI mode disables watch/reload behavior. The HTTP manifest checks do
not establish Wi-Fi connectivity, interactive reload, or physical-device
execution. The tutorial exports and mocked tests don't establish native
layout, accessibility focus, or screen-reader announcements.

## Thally validation and production checks

| Check | Result |
| --- | --- |
| `npm.cmd run typecheck` | Passed |
| `npm.cmd run check -- --ci` | Zero errors and warnings |
| `npm.cmd run build` | Passed; 47 generated routes/pages, three authored MDX modules |
| `npm.cmd start` | Production preview ready on port 3040 |
| `/`, `/introduction`, `/quickstart`, `/guides/task-filtering` | HTTP 200 |
| Navigation snapshot | Introduction, Quickstart, filtering guide in that order |
| Lesson internal links | All resolve successfully |
| Repository source paths | App, README, and validation-note targets exist |
| `/api/docs-index` | Exactly three lessons in the intended order |
| `/sitemap.xml`, `/llms.txt`, `/llms-full.txt` | HTTP 200; guide present, sample entries absent |
| Full-text query `filtering` | Two results, including the practical guide; links return 200 |
| Full-text query `Expo Go` | Three results; links return 200 |
| Unmatched query `ph3unmatchedqzxv987654` | Zero results, HTTP 200 |
| Removed sample routes | All eight return 404 |
| `/openapi.json`, `/openapi.yaml` | HTTP 200; framework documentation API descriptions preserved |
| `git diff --check` | Passed |

Removed routes: `/components`, `/customization`, `/changelog`,
`/api/introduction`, `/api/authentication`, `/guides/create-a-site`,
`/guides/work-with-the-cli`, and `/guides/connect-ai-tools`.

Although the build table includes a generated changelog route, the runtime
correctly returns 404 without authored changelog content. The framework's
service descriptions remain available without the unrelated sample API.
No sample URLs appear in lesson navigation, full-text results, the sitemap,
or the checked agent listings.

The first content-check attempt was denied npm registry access in the
sandbox. Repeating the same check with network access passed. No source
change was needed to fix that environment failure.

## Warnings and manual review

The example install retains its 20 moderate findings and the previously
recorded ESLint and transitive deprecation warnings. Bundle workers report
that `FORCE_COLOR` overrides `NO_COLOR`; exports still pass.

Root dependencies are unchanged. The last recorded root audit has 16 affected
packages (three high, eleven moderate, two low); this phase did not rerun that
audit or resolve those findings. See [setup notes](setup-notes.md) for the
dependency investigation. The optional embedding build still skips because
its standalone import reaches the `server-only` guard. Full-text search was
verified independently and needs no added embedding infrastructure. The
Next.js middleware-to-proxy deprecation remains; no runtime migration was made.

The in-app browser connection timed out twice. Production HTML, rendered heading hierarchy, and HTTP
responses were checked, but desktop/mobile visual layout, code overflow,
keyboard navigation, and rendered pagination interactions remain unverified.
Review those in a browser before publishing, including the long test block
and the note on the quickstart. No screenshot review is claimed.

The earlier user report confirms a successful iPhone Expo Go launch/test of
the unfiltered starter. It supplies neither device details nor individual
behavior results. This phase doesn't add Android device or simulator results,
and no physical-device testing of the tutorial filters is claimed. Check
larger text, safe areas, VoiceOver/TalkBack selected-state announcements, and
focus after a task disappears on a real device.

The new lesson and README links target the intended public URLs. Their Phase 3
content is only validated locally until the commit is reviewed, pushed, and
deployed. No new Cloud deployment or production revision was verified.
