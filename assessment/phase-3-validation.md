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

## Final editorial review

The follow-up review clarified the React/TypeScript audience, reduced repeated
verification caveats, and made the guide's two empty-state checks explicit.
It also explained the second-terminal workflow and replaced the claim that
filter controls announce their state with a description of the properties
exposed to accessibility services. Native announcements remain unverified.
The READMEs now distinguish this local revision from the existing Cloud site;
the root README links directly to lesson source and local review instructions.

The review found a factual omission in the earlier quickstart: its statement
that no Expo account was required conflicts with
[Expo's current physical-iPhone instructions](https://docs.expo.dev/get-started/start-developing/).
The quickstart and example README now require matching accounts in Expo CLI
and Expo Go for that path. The quickstart places sign-in after installation
and before server startup, and includes account-mismatch recovery. The earlier
reported iPhone test supplied no authentication details; it is not evidence
that these sign-in instructions were tested on a device.

From the example directory, `npx.cmd --no-install expo login --help` exited
successfully and showed `npx expo login` as the supported command, with browser
sign-in as the default. This checked the installed CLI only. No login,
credential storage, or account change was performed.

All nine fenced blocks in the filtering guide were compared with commit
`9eab3a7` and match exactly. The existing eight-test tutorial results and
platform exports remain applicable to those unchanged snippets; they were
not rerun for prose edits. Application source, tests, dependencies, lockfiles,
framework files, and navigation configuration remain unchanged.

Changed relative README links resolve to files, and internal lesson targets
match the existing routes. TypeScript passed, and Thally validation reported
zero errors and warnings on both runs, including after the last wording
adjustments. The production build passed with three authored MDX modules and
47 generated routes/pages. It retained the optional embedding skip and
middleware warning documented above. `git diff --check` passed. The final
diff contains only the three lesson pages, both READMEs, and this record.

Visual review remains outstanding: desktop/mobile readability, code overflow,
keyboard navigation, and pagination. Account sign-in on a physical iPhone,
filter interactions and reloads, larger text, safe areas, screen-reader
announcements, and focus after a task disappears remain unverified. No new
browser or device results are claimed. Existing audit and embedding notes
above remain in effect. No push or publishing action is part of this review.

## Progressive learning revision

The entry point is now basic JavaScript familiarity. The introduction explains
components, JSX, props, state, and the relevant TypeScript annotation using the
actual task screen. React Native, Expo, and Expo Go have distinct roles before
the reader is asked to install or change anything. Deeper React references
are optional rather than prerequisites for running the example.

The quickstart uses numbered install, sign-in, start, open, and interaction
steps with adjacent expected results. The Android skip appears before the
iPhone login command. Package findings moved into troubleshooting; the single
verification note follows the expected screen result. The matching-account
requirement and distinction between expected behavior and verified results
remain intact. Both READMEs describe the same JavaScript entry point and
checkpoint-based learning path.

The filtering guide now builds selection controls first, derived rows second,
and empty views third. Each stage is runnable and explains both its change
and what to observe before continuing. The tests are assembled incrementally:
a complete first test file, an import/helper update and membership test, then
two empty-state tests. The target counts are five, six, and eight tests while
retaining the original four. The final feature remains the same; the committed
starter stays unfiltered.

### Instructional review

These are editorial heuristics, not measured user behavior or usability-study
results:

| Review question | Change made |
| --- | --- |
| Is the goal apparent when scanning? | Each opening names a concrete outcome; action headings describe the sequence. |
| Is the next action easy to find? | The introduction links the quickstart near the opening; numbered steps and checkpoint subheadings identify what to do next. |
| Does each section build on earlier knowledge? | JSX/props/state are introduced in context; filter choice precedes derived rows, which precede empty-state handling. |
| Can progress be verified? | Expected install/server/screen results and per-stage interactions appear beside the commands or edits; test counts increase as tests are added. |
| Is repetition useful? | Repeated checkpoint commands are deliberate so each stage can be checked independently; audit details and verification caveats are kept outside the main action sequence. |
| Is unfamiliar knowledge explained? | Commands, SDK compatibility, state setters, union types, list props, predicates, conditional styles, and test queries receive short explanations where used. |
| Can a reader recover? | Local advice covers missing controls/styles, unchanged lists, wrong defaults, blank empty views, and lost tasks; quickstart troubleshooting retains shell, account, network, SDK, and installation recovery. |

The three-page navigation is unchanged. Two quickstart fragment links were
corrected to match Thally's heading slug rules. Source checks and production
HTML checks confirm that the in-page targets exist; this is not a claim of
visual or keyboard verification.

### Documentation checks

Root TypeScript passed. Thally validation reported zero errors and warnings.
The production build passed, compiling three authored MDX modules and generating
47 routes/pages. It retained the optional embedding skip and middleware warning
already described above. No dependency or framework change was made.

The default production-preview port 3040 was occupied. That server was left
alone; a separate production preview ran on port 3041. HTTP checks passed for
all three lessons, the introduction alias, internal links, rendered fragment
IDs, navigation order, source-file links, search results and their destinations,
empty search results, sitemap, and agent listings. Both README relative-link
checks passed. All eight removed sample URLs still return 404, while framework
API descriptions remain available.

The isolated tutorial uses the existing fresh-clone validation directory from
the earlier Phase 3 run. Its package manifest and lockfile were compared with
the maintained starter and match exactly. This revision did not run a new
installation or audit. The existing audit counts and limitations above remain
the recorded results.

### Isolated checkpoint results

The temporary verification script extracted the revised guide's code fences
and applied each stage at its stated insertion points. It asserted that edit
anchors were unique, retained the original test file, and added temporary
behavior checks only inside the isolated copy. The test-file stages then
assembled the exact published first-file, import/helper, membership, and
empty-state blocks in the documented order.

| Stage | TypeScript and lint | Original tests | Additional result |
| --- | --- | --- | --- |
| 1: select a filter | Passed | Four passed | One temporary test passed: selection changes, exactly one option is selected, all three tasks and their statuses remain visible. |
| 2: derive matching rows | Passed | Four passed | Two temporary tests passed: initial view membership and reversible movement between Active and Completed without losing tasks. |
| 3: explain empty views | Passed | Four passed | Two temporary tests passed: empty Active/Completed messages, controls retained, updated tasks preserved when returning to All. |
| 4a: first published test | Passed | Included | Two suites, five tests passed. |
| 4b: add membership test | Checked again at final stage | Included | Two suites, six tests passed. |
| 4c: add empty-state tests | Passed | Included | Two suites, eight tests passed; no snapshots. |

This staged run supersedes the earlier nine-unchanged-block comparison for
the editorial-only revision. The snippets have now been reorganized and split
for teaching, and were tested again from the isolated baseline. The final
behavior remains the same. Neither the temporary checkpoint tests nor the
completed tutorial solution is added to the maintained example.

The review preview command is
`node node_modules/next/dist/bin/next start -p 3041` from the repository root.
It serves the newly built documentation at http://localhost:3041 for local
review. The default-port server was not stopped or replaced.

Manual review remains required for desktop/mobile readability, code overflow,
keyboard navigation, pagination, and the physical-device sign-in flow. Larger
text, safe areas, filtering interactions and reloads, screen-reader selected
states, announcements, and focus after a disappearing row are not established
by the mocked tests or bundles. No new browser or device results are claimed.
No push, Cloud deployment, or live-revision verification is part of this change.

The final isolated solution exported successfully for both platforms:
Android generated a Hermes bundle from 603 modules; iOS generated one from
605 modules. Metro workers repeated the existing `FORCE_COLOR`/`NO_COLOR`
warning. The complete staged verification exited successfully. These exports
establish bundle compatibility, not physical-device execution.

Final whitespace validation passed. The reviewed six-file diff contains only
the three lesson pages, both READMEs, and this validation record. The starter's
source, tests, package manifests and lockfiles, navigation, and framework pin
have no changes. The documentation is committed locally for review; nothing
was pushed or published.

## Document identity and navigation labels

The original screenshot wasn't available for direct comparison. Inspection
traced the current repeated name to separate authored settings and rendering
paths: `src/data/site.ts` supplies the wordmark; the `docs.json` group name
supplies the sidebar group and the label above the content heading; the
introduction's frontmatter supplied another product-name heading. Breadcrumbs
combined the tab, group, and navigation page label again.

| Surface | Before | After |
| --- | --- | --- |
| Site identity | Expo for React Developers | Unchanged |
| Collection/tab | Learn Expo | Guide |
| Authored sidebar group | Expo for React developers | Removed; pages are listed directly on the tab |
| Group label above the page heading | Expo for React developers | Absent for these ungrouped pages |
| Breadcrumb display | Tab, group, page | Disabled with `breadcrumbs: false` |
| Introduction heading and navigation label | Expo for React developers | Introduction |
| Quickstart navigation and pagination label | Run the app on your phone | Quickstart via `navTitle` |
| Filtering navigation and pagination label | Build and test task filtering | Task filtering via `navTitle` |
| Quickstart and filtering content headings | Descriptive task headings | Unchanged |

Both README learning-path links use Introduction, Quickstart, and Task filtering.
All page routes and their order are unchanged. Configuration changes are
limited to the tab/pages structure and breadcrumb flag; other settings and
site identity remain intact. No runtime or custom CSS change was made.

The installed runtime supports top-level tab `pages`, `navTitle` frontmatter,
and the `breadcrumbs` flag. This was traced through the navigation loader,
page header/layout, and breadcrumb components, then checked with the official
CLI. Earlier attempts to retrieve online navigation documentation were
unsuccessful; no unsupported setting or layout workaround was introduced.

The skimmability review checked the current heading sequence and next actions:
the introduction establishes the model and points to the first run; the
quickstart has numbered actions and adjacent expected results; the guide
preserves selection, matching-row, empty-state, and incremental-test
checkpoints. No substantive comprehension issue justified another body edit.
All three lesson bodies were compared with commit `b226941` and are identical,
including all 25 fenced code blocks (2 introduction, 3 quickstart, 20 guide).
The previously validated staged solution and test progression weren't changed
or rerun for this frontmatter/configuration update.

### Revalidation

- `npm.cmd run typecheck`: passed.
- `npm.cmd run check -- --ci`: zero errors and warnings.
- `npm.cmd run build`: passed; three authored MDX modules and 47 generated
  routes/pages. Existing embedding skip and middleware warning remain.
- A fresh production preview started with
  `node node_modules/next/dist/bin/next start -p 3042`. Existing previews
  weren't replaced. The current review URL is http://localhost:3042.
- The navigation response contains one Guide collection with three direct
  page nodes, the exact compact labels and expected destinations, and no
  authored group ancestry.
- Production HTML checks passed for `/`, `/introduction`, `/quickstart`, and
  `/guides/task-filtering`: correct content headings, no rendered breadcrumb
  navigation or group eyebrow, branding retained, and the compact sidebar
  labels. Previous/next labels and their destinations passed on every page.
- Routes, full-text search, unmatched search, sitemap, agent listings, removed
  sample-page 404s, and preserved framework API descriptions passed again.
  The filtering query returned two results, Expo Go returned three, and the
  unmatched query returned zero; result links loaded successfully.
- The first temporary navigation assertion assumed a derived `items` array
  in the response. The actual wire format uses `nodes`; the test was corrected
  to inspect that format and passed. No application change was needed.
- `git diff --check`: passed before the local commit.

### Layout limits and manual review

The desktop sidebar suppresses a root section heading matching its collection.
The mobile drawer uses the same root section with a heading and its own
collection navigation, so it can still show a short Guide context label in
more than one place. The inspected supported settings don't provide a separate
switch to hide only that mobile heading. This is a runtime layout limitation,
not another authored product-name group. No CSS or runtime edit was used to
hide it.

Branding is also used by the top bar and mobile drawer, and the site name
remains in browser/social metadata and responsive markup. Counting raw HTML
occurrences would conflate metadata and alternate layout surfaces with what a
reader actually sees. The change removes the authored sources of repetition;
it does not claim a visually verified single occurrence at every breakpoint.

Desktop/mobile appearance, wrapping, keyboard navigation, and pagination
interaction still require visual review. No new browser, accessibility, or
physical-device result is claimed. Existing audit findings and embedding/device
limitations remain documented above. This update is committed locally only;
no push, Cloud deployment, or deployment-setting change was performed.

## Sidebar hierarchy refinement

The requested hierarchy is the product wordmark, a GUIDE section heading, and
Introduction, Quickstart, and Task filtering beneath it. Two supported
configuration fields implement it: `navigation.display: "dropdown"` selects
Thally's collection-switcher presentation, and the existing tab's
`displayLabel: "GUIDE"` supplies the uppercase heading. The internal tab name,
page IDs, order, URLs, compact labels, and breadcrumb setting are unchanged.

Despite the mode's name, a single collection does not create a desktop
dropdown: the installed sidebar renders a static title, while the header
omits its separate collection-tab row. On mobile, the single-collection
switcher returns no control and the root section supplies the GUIDE heading.
That is the configured layout behavior; it is not a new visual-test result.

The current page retains Thally's native accent background/text and
`aria-current="page"` treatment. The runtime uses normal font weight for
navigation links, so the requested bold example is represented by that
built-in active-page highlight rather than a permanently bold Introduction
label. No custom CSS or generated runtime change was introduced.

Only documentation configuration and this validation record changed. Lesson
content, all code blocks, application source, dependencies, and deployment
settings remain untouched.

Validation passed for this refinement: root TypeScript, Thally content check
(zero errors and warnings), production build (three authored MDX modules and
47 generated routes/pages), and whitespace checks. The embedding skip and
middleware deprecation remain unchanged.

The owned production preview was restarted on the same port, 3042. Production
HTML checks confirm exactly one static GUIDE heading in the desktop sidebar,
no separate collection-tab row, three correctly ordered page links, and one
correct `aria-current="page"` link on `/`, `/introduction`, `/quickstart`, and
`/guides/task-filtering`. The wordmark and descriptive content headings remain;
breadcrumbs and the group eyebrow remain absent. Pagination links, search,
unmatched search, discovery, and removed sample URLs passed again.

The non-default-port preview reports that its default canonical origin is
still localhost:3040. Local route checks target port 3042 directly; no claim
is made that preview canonical URLs were changed. No environment file or
Cloud deployment setting was modified to suppress this local preview warning.

Desktop/mobile visual appearance, keyboard behavior, wrapping, and the mobile
drawer still need visual review. The checks above inspect server output and
navigation semantics; they aren't browser or accessibility testing. Existing
physical-device and audit limitations remain unchanged. The change is
committed locally only, with no push or publishing action.
