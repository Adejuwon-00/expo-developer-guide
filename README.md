# Expo for React Developers

A practical learning resource for React developers building their first mobile
app with Expo and React Native. The documentation uses Thally.

Read the lessons in this revision:

- [Introduction](src/content/introduction.mdx)
- [Run the app on your phone](src/content/quickstart.mdx)
- [Build and test task filtering](src/content/guides/task-filtering.mdx)

Existing site: https://expo-developer-guide.thally.app. The Phase 3 lessons
are committed locally for review and haven't been pushed or verified on Cloud.

The [Expo task starter](examples/expo-task-starter/README.md) is an independent
application with its own dependencies and lockfile. It has completion toggles
but no filters: the practical guide teaches you to add them locally.

## Run the example

From the repository root:

```sh
cd examples/expo-task-starter
npm ci
npm start
```

Follow the example README for Expo Go setup and checks, including the matching
Expo account requirement for physical iPhone use. Installing dependencies
at the repository root doesn't install the example's dependencies.

## Work on the documentation

Use Node.js 22.16.0 with npm 10.9.2 to match the checked environment. The root
package's `engines` field lists other accepted Node.js versions.

From the repository root:

```sh
npm ci
npm run dev
```

Open http://localhost:3040. Review the introduction, follow the quickstart,
then read the filtering guide. The app stays unfiltered until you apply the
guide locally. The [validation record](assessment/phase-3-validation.md)
separates completed checks from the remaining visual and device review.

If PowerShell blocks `npm.ps1`, use `npm.cmd` in
place of `npm`; you don't need to change the system execution policy.

Pages live in `src/content/`, navigation in `docs.json`, and site identity in
`src/data/site.ts`. These authored files are the source for the local preview
and the next deployment.

Before committing documentation changes:

```sh
npm run typecheck
npm run check -- --ci
npm run build
```

The content check invokes the official Thally CLI and may need registry
access. The production preview is `npm start`, on port 3040. These root
commands run the documentation site; the example's `npm start` runs Expo.

## Keep the framework boundary clear

The generated Thally runtime and `starter-release.json` describe a pinned
framework snapshot. Don't edit runtime files to change documentation. Use
`npm run starter:update` to review a framework update plan before applying it.
See [AGENTS.md](AGENTS.md) for repository ownership and authoring rules.

Cloud publishes from the connected GitHub repository. A successful push alone
doesn't verify a live deployment; check its revision and published pages.
Keep credentials outside source control.

## Validation records

[Setup notes](assessment/setup-notes.md) retain the documentation dependency
audit and optional embedding limitation. [Phase 2 validation](assessment/phase-2-validation.md)
separates automated app checks from the reported iPhone test. [Phase 3 validation](assessment/phase-3-validation.md) covers the documentation
and isolated tutorial checks.

## License

[MIT](LICENSE)
