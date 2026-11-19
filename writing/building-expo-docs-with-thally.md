# From Code to Docs: Building an Expo Developer Guide with Thally

I use Expo regularly, so it gave me a familiar subject for trying Thally. A small task list offered a useful teaching problem: help someone get an app running, understand its state, then change its behavior.

The result is [Expo for React Developers](https://expo-developer-guide.thally.app/), with the [documentation and example application on GitHub](https://github.com/Adejuwon-00/expo-developer-guide). Readers need basic JavaScript familiarity. React experience helps, but the lessons introduce components, state, and TypeScript where they become useful.

## Start with a repository you can work in

For managed hosting, you need Thally Cloud and GitHub accounts, with permission to approve the Thally GitHub App. Local authoring also needs Git, Node.js, and npm. My checked environment was Node.js 22.16.0 and npm 10.9.2.

[Thally’s current quickstart](https://docs.thally.io/quickstart) recommends creating a site in Cloud and letting it create the documentation repository. My project took the existing-repository path: I already had an empty GitHub repository and prepared the Thally project locally before connecting it.

The initializer, `create-thally-docs@0.10.135`, refused to scaffold into the checkout because it contained `.git`. I generated the starter in a separate directory, then copied its files into the checkout, excluding the starter’s generated Git directory. That preserved the existing remote. It was a workaround for this setup, not a reason to replace an existing repository’s history.

To explore the finished documentation locally:

```sh
git clone https://github.com/Adejuwon-00/expo-developer-guide.git
cd expo-developer-guide
npm ci
npm run dev
```

Open `http://localhost:3040`. These root commands run Thally; the Expo example under `examples/expo-task-starter/` has separate dependencies and commands. In PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

## Give each page a job

Thally pages live under `src/content/`. MDX combines Markdown with supported components, although ordinary headings, links, and code fences were enough for most of this guide. Each page begins with frontmatter:

```yaml
---
title: Introduction
description: An overview of the tools and lessons used to build the Expo task-list app.
---
```

I organized the material into three lessons. The introduction sets out the outcome and audience, then introduces React Native, Expo, and state. The quickstart gets the starter onto a phone through Expo Go. The practical guide adds All, Active, and Completed filters, then tests them.

The committed starter deliberately has no filters. Readers first make the controls respond, then show matching tasks, then handle empty results. Each checkpoint explains the change and gives an observable result before the next edit.

## Make navigation match the learning path

Content files alone don’t communicate reading order. This excerpt from `docs.json` defines it:

```json
{
  "breadcrumbs": false,
  "navigation": { "display": "dropdown" },
  "tabs": [{
    "tab": "Guide",
    "displayLabel": "GUIDE",
    "pages": ["introduction", "quickstart", "guides/task-filtering"]
  }]
}
```

Page entries are paths relative to `src/content/`, without `.mdx`. With one collection, this configuration gives the installed runtime a static GUIDE sidebar heading and removes the extra tab row. Page-level `navTitle` values keep Quickstart and Task filtering short while preserving descriptive page headings.

I also removed unrelated sample pages. Hiding them from navigation would still leave their URLs reachable.

## Test the instructions readers receive

From the repository root, I ran:

```sh
npm run typecheck
npm run check -- --ci
npm run build
```

TypeScript passed, Thally reported zero errors and warnings, and the production build succeeded. These checks validate the documentation project; they don’t prove the tutorial’s app behavior.

For that, I applied the guide’s snippets in order to an isolated starter copy. Each implementation checkpoint passed TypeScript, lint, and the original four tests. The published test additions brought the total to eight. Android and iOS bundles also generated successfully, while the maintained starter stayed unchanged.

I launched the starter on a physical iPhone through Expo Go. Individual accessibility behaviors and tutorial filtering remain unverified on-device; Android device testing is also pending. Mocked tests and bundles don’t establish native behavior.

The validation notes retain unresolved dependency findings. Optional embedding generation also skips; full-text search was checked independently. A passing build isn’t a clean security audit or proof of semantic search.

## Publish, then check what arrived

In [Thally Cloud](https://app.thally.io/), select **Create a site**, enter its name and address, then choose **Use an existing repository** only after it contains a compatible Thally project. Approve repository access, select the repository with `main` as its production branch, and review the settings before publishing. Optional Product sources and Knowledge surfaces can wait.

Once connected, a reviewed `git push origin main` triggers managed publishing. The latest published revision is `0dfaef5`, matching the Cloud revision I confirmed in the dashboard. Public checks confirmed the lessons, navigation, links, discovery listings, and full-text search, including an unmatched query returning zero results.

Earlier provisioning failed. My recollection is that recreating the failed Cloud site resolved it, with no failures since. The available records don’t establish the original error, investigation details, or root cause, so I can’t recommend recreation as a general fix. If yours fails, preserve the message and inspect deployment status before retrying.

## Make progress visible

The most useful lesson was to make progress visible. A selected filter, a changed list, and a passing test each tell readers whether they can continue. Checking those transitions made the documentation more dependable than reviewing the prose alone.
