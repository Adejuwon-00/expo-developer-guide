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
