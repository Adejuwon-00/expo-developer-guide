# Thally setup notes

## Repository foundation

The existing GitHub repository was empty when inspected on 18 November 2026.
Its remote is `https://github.com/Adejuwon-00/expo-developer-guide.git`.

The official initializer, `create-thally-docs@0.10.135`, refused to scaffold
directly into the cloned repository because the directory contained `.git`.
I generated the starter in a separate local directory and copied its project
files into the existing checkout, excluding the generated Git directory.
This preserved the intended remote and avoided creating another GitHub repository.

The generated `AGENTS.md` identifies content, navigation, and site identity as
editable surfaces. Framework files and `starter-release.json` remain unchanged.
Only the project name, site identity, repository link, and README introduction
were customized at this stage. The included documentation remains sample content.

## Validation

- `npm install --package-lock-only --ignore-scripts` synchronized the package name.
- The first dependency installation failed with `ECONNRESET`; a retry of
  `npm ci --fetch-retries=3 --no-audit --no-fund` completed successfully.
- `create-thally-docs@0.10.135 check . --ci` reported zero errors and warnings.
- `npm run typecheck` passed.
- The first production build compiled, completed its TypeScript check, and
  generated all 57 pages, then exited with `SecurityFatalError` reporting a
  known vulnerability in the pinned Next.js version (`16.4.1`). A framework
  security update is recommended before treating this as deployment-ready.
- A second `npm run build` exited successfully and generated all 57 pages.
  It repeated the security advisory; a successful build does not resolve it.
- The prebuild embedding step skipped generation with a server-only module
  import message. The script continued to the Next.js build; semantic embedding
  generation has not been verified.
- The lockfile operation reported 28 dependency advisories. Their dependency
  paths and production relevance have not yet been investigated; no automatic
  dependency upgrades were applied.
- Git's whitespace check found trailing blank lines in 13 upstream scaffold
  files. They were left intact to preserve the generated runtime snapshot.

## Cloud connection

Cloud configuration and deployment remain unverified. The intended connection
is this existing repository, with `main` proposed as the production branch.
The initial files must be pushed before Cloud can inspect that branch.
Account sign-in and approval of the Thally GitHub App require the account owner.

## Security patch review

Next.js was pinned to `16.4.1`. npm identified two cache disclosure advisories:
`GHSA-mfr8-8qww-v76h` and `GHSA-vc7v-qv4w-wrv8`. Both cover that version and
are fixed in `16.4.5`. The latest published patch in the same release line at
the time of this review was `16.4.6`.

Official guidance: https://nextjs.org/blog/november-2026-security-release.

The update pins Next.js to `16.4.6` and aligns `eslint-config-next` from
`16.3.5` to `16.4.6`. The lockfile changes only those packages and their
matching Next.js environment, compiler, and ESLint plugin packages. React,
the Thally runtime snapshot, and framework source are unchanged.

The first clean install failed because Windows could not unlink libSQL's native
module. A running development server belonging to this checkout held the module
open. Its project processes were stopped before retrying installation.

## Why embedding generation skips

`scripts/build-embeddings.ts` imports the embedding facade, which imports
`src/lib/search/register-doc-source.ts`. That registration imports
`src/lib/i18n/request.ts`, which imports `server-only`. Plain `tsx` execution
selects the marker package's default throwing entry point, rather than its
empty `react-server` export. This produces the misleading Client Component
message even though the command is a Node build script.

The script deliberately catches failures and exits successfully. Its comment
describes lazy index generation at runtime; the installed core's
`getEmbeddingIndex()` builds the index on demand. Neither behavior proves
semantic search works in the deployed runtime.

For this site's normal search, the dialog explicitly requests `mode=fulltext`.
The API also defaults to full-text and degrades hybrid requests to full-text
in asset-backed runtimes. Prebuilt embeddings are therefore optional for the
ordinary documentation search path. No embedding provider, credentials, or
additional infrastructure were added, and the warning was not suppressed.

## DOMPurify review

The affected dependency path was `expo-developer-guide -> mermaid@11.16.1 ->
dompurify@3.4.13`. The critical advisory `GHSA-cg2g-xh64-v4q7` affects
versions `3.4.4` through `3.4.16` and is patched in `3.4.17`.

The latest compatible patch, `3.4.18`, fits Mermaid's existing `^3.3.3`
dependency range. A targeted `npm update dompurify --package-lock-only
--ignore-scripts --no-audit --no-fund` updated only DOMPurify beyond the
already approved Next.js package changes. No direct dependency or override
was added, and Mermaid's version and Thally's generated runtime are unchanged.

References:

- https://github.com/cure53/DOMPurify/security/advisories/GHSA-cg2g-xh64-v4q7
- https://github.com/cure53/DOMPurify/releases/tag/3.4.18

The vulnerable library is available to client-side Mermaid rendering. The
import resolves to `mermaid.core.mjs`, which uses the external DOMPurify
dependency, rather than Mermaid's separately bundled ESM sanitizer. Thally's
component initializes Mermaid with `securityLevel: 'strict'`. The inspected
sanitization calls use strings and return strings; this project does not set
`SAFE_FOR_TEMPLATES`, `RETURN_DOM`, `RETURN_DOM_FRAGMENT`, or `IN_PLACE`.
No current content page contains a Mermaid diagram.

The critical advisory requires template safety mode plus DOM output, an input
node with an attached shadow root, and downstream template evaluation. Those
conditions were not found in the current documentation path. This is a static
reachability assessment, not an exploit test or a claim about every possible
future diagram configuration. The compatible patch was applied regardless.

## Remaining audit findings after both patches

`npm audit --json` reports 16 affected packages: zero critical, three high,
11 moderate, and two low. Neither Next.js nor DOMPurify appears in that report.
These are package counts, including dependency-chain effects, not 16 proven
exploitable paths in this application.

| Severity | Packages |
| --- | --- |
| High | `brace-expansion`, `source-map-js`, `zod` |
| Moderate | `@tailwindcss/typography`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `@typescript-eslint/type-utils`, `@typescript-eslint/typescript-estree`, `@typescript-eslint/utils`, `minimatch`, `postcss-nested`, `postcss-selector-parser`, `tailwindcss`, `typescript-eslint` |
| Low | `katex`, `mermaid` |

npm reports compatible fixes for several transitive packages, but some proposed
resolutions cross existing dependency constraints: KaTeX `0.19.1`, Mermaid
`12.3.0`, and a downgrade of `@tailwindcss/typography` to `0.5.4`. The scaffold
also pins a vulnerable `postcss-selector-parser` override at `6.1.3`.
Those changes are outside this targeted patch and were not applied. The remaining
findings require a separate dependency review; no force-upgrade was run.

## Validation of the patched dependency set

- `npm ci`: passed with Next.js `16.4.6`, `eslint-config-next` `16.4.6`,
  and DOMPurify `3.4.18` installed from the final lockfile.
- `npm run typecheck`: passed.
- `npm run check -- --ci`: passed, zero errors and zero warnings.
- `npm run build`: passed on its first run with the final dependencies;
  all 57 pages generated. The earlier Next.js security message did not recur.
- `npm audit --json`: 16 affected packages, listed above; no critical findings.
- `git diff --check`: passed for this patch.

The production server was started with `npm run start -- --hostname 127.0.0.1
--port 3042`. HTTP checks verified:

| Request | Result |
| --- | --- |
| `/` | HTTP 200, project name present |
| `/quickstart` | HTTP 200, project name present |
| `/api/search?q=quickstart&mode=fulltext` | HTTP 200, full-text mode, four results; Quickstart ranked first |
| Every returned result link | HTTP 200 for `/quickstart`, `/changelog`, `/guides/connect-ai-tools`, and `/` |
| `/api/search?q=zzzxqvnomatch739128&mode=fulltext` | HTTP 200, zero results |

The temporary production server was stopped after verification. These checks
establish local production full-text search behavior, not a verified Cloud
deployment or semantic-search result. No browser visual test was performed.

Remaining warnings: embedding generation skips as explained above, Next.js
deprecates the scaffold's middleware convention, and installation warns about
the transitive `node-domexception@1.0.0` package. Git also warns that the sandbox
cannot read the user's global ignore file; per-command repository ownership
exceptions were used without changing global Git configuration.

## Push and Cloud handoff

No push or Cloud deployment has been performed. After explicit approval, run
from this repository:

```powershell
git push --set-upstream https://github.com/Adejuwon-00/expo-developer-guide.git main
```

Then use Thally Cloud's existing-repository workflow, approve GitHub App access
to this repository, and confirm `main` as the production branch. Use the project
name and description already in `src/data/site.ts`. Confirm an available site
address with the account owner and skip Product sources and Knowledge surfaces.
Review the setup before publishing; verify Live status, the deployed commit,
page navigation, and full-text search before beginning the Expo application.
