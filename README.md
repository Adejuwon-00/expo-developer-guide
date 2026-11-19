# Expo for React Developers

Learn how to build, run, and test mobile apps with Expo and React Native, one practical step at a time.

This project takes you from running a simple task-list app on your phone to building and testing your first feature. You'll work with components, state, and user interactions using a real example rather than disconnected snippets.

You'll need basic JavaScript knowledge. React experience helps, but you don't need prior Expo or React Native experience.

## Read the documentation

**[Explore the documentation](https://expo-developer-guide.thally.app/)**

The guide follows three lessons:

1. **[Introduction](https://expo-developer-guide.thally.app/introduction)** — Understand Expo, React Native, and what you'll build.
2. **[Quickstart](https://expo-developer-guide.thally.app/quickstart)** — Run the task-list app on your phone using Expo Go.
3. **[Task filtering](https://expo-developer-guide.thally.app/guides/task-filtering)** — Add All, Active, and Completed filters, then test the behavior.

Each lesson builds on the previous one, with practical steps and checkpoints to help you verify your progress.

The documentation is built and published with [Thally](https://docs.thally.io/quickstart).

## Run the Expo example

The repository includes a standalone Expo application in `examples/expo-task-starter/`.

**Requirements:** Git, Node.js, npm, and a phone with Expo Go supporting SDK 58. Connect your computer and phone to the same Wi-Fi network. The example was checked with Node.js 22.16.0 and npm 10.9.2.

From your terminal:

```sh
git clone https://github.com/Adejuwon-00/expo-developer-guide.git
cd expo-developer-guide/examples/expo-task-starter
npm ci
```

**Using a physical iPhone?** Run `npx expo login` from this directory, then sign into Expo Go with the same Expo account. Android users can skip this sign-in step.

Start the app's development server:

```sh
npm start
```

Keep the terminal open and scan its QR code, following the iPhone or Android instructions in the [example README](examples/expo-task-starter/README.md).

You should see **Task starter** with three tasks that you can mark complete or incomplete. **The starter deliberately doesn't include filtering yet.** You'll add that feature in the practical guide.

The Expo application has its own dependencies and lockfile, separate from the documentation site.

## Work on the documentation

You can also preview the documentation locally to explore the source or contribute changes. Use the checked Node.js/npm environment above.

In a separate terminal at the repository root:

```sh
npm ci
npm run dev
```

Open [http://localhost:3040](http://localhost:3040).

The main files you'll work with are:

| File or directory | Purpose |
| --- | --- |
| `src/content/` | MDX documentation pages |
| `docs.json` | Navigation and documentation configuration |
| `src/data/site.ts` | Site identity and metadata |
| `examples/expo-task-starter/` | Standalone Expo example |

Run documentation commands from the repository root and Expo commands from the example directory.

### Validate your changes

Before committing documentation updates, run these from the repository root in another terminal:

```sh
npm run typecheck
npm run check -- --ci
npm run build
```

These check TypeScript, Thally content, and the production build. Application tests run separately from the Expo example directory.

On Windows, if PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm`, and `npx.cmd` instead of `npx`.

For repository maintenance and framework-update conventions, see [AGENTS.md](AGENTS.md).

## Project notes

Setup decisions, implementation checks, and remaining validation limitations are documented in the [assessment directory](assessment/).

These records distinguish automated checks from manual device testing and other verification that hasn't been completed.

## License

[MIT](LICENSE)
