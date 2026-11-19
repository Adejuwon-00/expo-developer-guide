# Expo task starter

A small task list for JavaScript developers learning how React components and
state work on a phone. No prior Expo or React Native knowledge is assumed.
You can mark three sample tasks complete or incomplete. Filtering is left for
the practical guide, which adds selection, matching rows, and empty states
in separate runnable steps before testing the feature.

The app uses Expo SDK 58, React Native, and TypeScript. It has no backend or
saved storage. A full reload resets the tasks; returning from the background
may keep the current state, and Fast Refresh can preserve it during development.

## Run the app

Use Node.js and npm. This example was checked with Node.js 22.16.0 and npm
10.9.2. The supported Node.js release ranges are listed in `package.json`.
Install Expo Go on your Android phone or iPhone, with support for SDK 58.

From the repository root:

```sh
cd examples/expo-task-starter
npm ci
```

This directory has its own dependencies and lockfile. Installing dependencies
in the repository root runs the Thally setup, not this example's setup.

For a physical iPhone, [Expo's current instructions](https://docs.expo.dev/get-started/start-developing/)
require matching Expo accounts in the CLI and Expo Go. Run `npx expo login`
from this directory and sign in to the same account in Expo Go. This follows
official guidance; the earlier iPhone report didn't specify sign-in details.

Then start the server:

```sh
npm start
```

Keep the terminal open and connect your computer and phone to the same Wi-Fi
network. Metro prints a QR code and connection address.

- **Android:** open Expo Go and use its QR scanner to scan the terminal code.
- **iPhone:** scan the code with the Camera app and open the link in Expo Go.

You should see **Task starter** and three tasks. The first two are incomplete;
**Explore the starter code** is complete. Tap a row to change its state.
Press `r` in the terminal for a full reload or `Ctrl+C` to stop the server.

If your phone cannot connect, check that both devices are on the same network
and that a VPN or guest-network isolation is not blocking local traffic. On
Windows, allow Node.js through the firewall for your trusted private network
when prompted. If Expo Go reports an SDK mismatch, check its SDK 58 support
before changing dependencies.

## Check the example

Run these commands from this directory:

```sh
npm run typecheck
npm run lint
npm test
npx expo install --check
npx --yes expo-doctor@latest
```

The tests check the initial tasks, reversible toggles, independent updates,
and consecutive presses. They use mocked native modules; they do not replace
testing on Android and iOS.

## Check on both phones

The project author reported successfully launching and testing the app on a
physical iPhone through Expo Go on 19 November 2026. The device model, iOS
version, and individual checklist results were not specified. Initial task
states, completion toggles, rapid interactions, larger text, VoiceOver, safe
areas, scrolling, and reload behavior remain individually unverified on-device.
Android physical-device testing is still pending.

Use this checklist on each platform; it describes expected behavior rather
than a record of completed device checks:

- Confirm all three tasks and their initial states.
- Toggle every row twice and confirm it returns to its original state.
- Tap one task repeatedly and alternate between tasks. Each row should update
  independently, with matching checkbox and status text.
- Increase the system text size. Check that titles wrap, rows grow, and you
  can scroll to every task and the footer.
- Check that content stays clear of the notch, status bar, and home indicator.
- With TalkBack on Android or VoiceOver on iPhone, confirm each task is one
  checkbox control with its title and correct checked state. Activate it and
  confirm that the state changes.
- Press `r` in the terminal for a full reload and confirm the initial task
  states return.

The Android and iOS bundles were generated on Windows. Android's automated
build, compatibility, and manifest checks passed; no Android device test or
simulator execution on either platform has been confirmed. The iPhone result
above was reported by the project author, not observed by the coding agent.

## Find your way around

`App.tsx` contains the task type, initial data, state updates, screen, and styles.
`__tests__/App.test.tsx` checks the visible behavior. The safe-area library is
included in Expo Go; no custom native modules or development build are needed
for this example.

Documentation: https://expo-developer-guide.thally.app

See the repository's `assessment/phase-2-validation.md` for command results,
tooling fixes, and remaining dependency warnings.

Learning path: [Introduction](https://expo-developer-guide.thally.app/introduction),
[Quickstart](https://expo-developer-guide.thally.app/quickstart), and
[Task filtering](https://expo-developer-guide.thally.app/guides/task-filtering).
The filtering lesson extends this starter locally; the committed app remains
unfiltered.
