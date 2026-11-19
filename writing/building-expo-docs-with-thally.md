# From Code to Docs: Building an Expo Developer Guide with Thally

Getting an app running is one thing. Understanding enough of it to change something is another.

That's what I wanted to focus on when I started building this guide. I've worked with Expo before, and a small task-list app gave me something practical to teach: run the app, understand how its state works, then add and test a feature.

I used Thally to turn that learning experience into a documentation site. You can explore the [published guide](https://expo-developer-guide.thally.app/) or look through the [source repository](https://github.com/Adejuwon-00/expo-developer-guide).

Here's how I approached the setup, content, and publishing process.

## Getting started with Thally

You'll need Git, Node.js, and npm to work locally, plus GitHub and Thally Cloud accounts for managed publishing. I used Node.js 22.16.0 and npm 10.9.2.

There are two ways to approach the setup.

The simplest is to follow [Thally's quickstart](https://docs.thally.io/quickstart): create a site in Cloud and let Thally generate the repository.

I already had an empty GitHub repository, so I took the existing-repository route instead.

To explore the finished project locally:

```bash
git clone https://github.com/Adejuwon-00/expo-developer-guide.git
cd expo-developer-guide
npm ci
npm run dev
```

Open `http://localhost:3040` to view the documentation.

The Expo application lives separately in `examples/expo-task-starter/`, with its own dependencies and commands.

## Creating the documentation pages

Thally stores documentation pages as MDX files inside `src/content/`. Each page starts with frontmatter followed by the content.

For example, a simple page at `src/content/introduction.mdx` might look like this:

```mdx
---
title: Introduction
description: Learn what this guide covers and where to begin.
---

Start by running the app on your phone.

[Open the quickstart](/quickstart)
```

That's enough to create a page with a title, description, and a link to another lesson. Thally renders the title from frontmatter, so the body doesn't need another H1. The example is illustrative; the published introduction contains more context.

I organized my site into three lessons:

- **Introduction:** What you'll build and the React Native, Expo, and state concepts you'll need.
- **Quickstart:** How to install the starter and run it on a phone using Expo Go.
- **Task filtering:** How to add All, Active, and Completed filters, then test the behavior.

The starter deliberately doesn't include filtering. Readers add the feature themselves.

At first, the filtering tutorial asked readers to make several changes before they could see a result. I found that harder to follow than necessary, so I reorganized it into smaller checkpoints.

First, make the filter controls respond. Then connect them to the task list. After that, handle empty results and add automated tests.

Each step gives the reader something specific to check before moving on.

## Making navigation easier to follow

The content files define the lessons, but `docs.json` determines how readers move between them.

Here's the navigation configuration I used:

```json
{
  "breadcrumbs": false,
  "navigation": {
    "display": "dropdown"
  },
  "tabs": [
    {
      "tab": "Guide",
      "displayLabel": "GUIDE",
      "pages": [
        "introduction",
        "quickstart",
        "guides/task-filtering"
      ]
    }
  ]
}
```

The page paths are relative to `src/content/`, without the `.mdx` extension.

I also made a small UX change here. The project name originally appeared in several places: the site branding, navigation group, breadcrumbs, and introduction heading.

Each label made sense individually, but together they felt repetitive. I simplified the navigation so readers could focus on the three lessons instead of seeing the project name repeated throughout the interface.

I removed the unused starter pages as well. Hiding a page from navigation doesn't necessarily make its URL unavailable.

## Testing the documentation

Before publishing, I ran the documentation checks from the repository root:

```bash
npm run typecheck
npm run check -- --ci
npm run build
```

Those checks passed, but they only validate the documentation project. They don't prove the code inside a tutorial works.

So I tested the tutorial separately.

I applied the filtering instructions to an isolated copy of the original Expo starter, following the same sequence a reader would use. Each implementation checkpoint passed TypeScript, lint, and the existing tests. Once the new filtering tests were added, the complete suite reached eight passing tests.

I also generated Android and iOS bundles and ran the original starter on a physical iPhone using Expo Go.

The completed filtering feature and accessibility behaviors weren't individually verified on a physical device, so I kept that distinction clear in the project's validation records. Android device testing also remains unverified.

For me, testing documentation isn't just about making sure the site builds. It's also about checking whether the instructions produce the result they promise.

## Publishing with Thally Cloud

Once the repository contained the Thally project, I connected it through [Thally Cloud](https://app.thally.io/).

I selected **Use an existing repository**, approved GitHub access, chose the repository and `main` as the production branch, then published the site.

After that, pushing changes to `main` triggered new deployments. I checked the live pages, navigation, links, and search to make sure the published site reflected the changes.

The initial setup wasn't completely smooth. My recollection is that recreating a failed Cloud site resolved a provisioning problem.

The original error, investigation details, and root cause aren't available, so I wouldn't treat recreating a site as a general troubleshooting fix. If you encounter a similar issue, keep the error details and inspect the deployment status before retrying.

## What I learned

One thing this project reinforced for me is that good documentation should help developers know when they're on the right track.

In the filtering guide, every stage has something they can verify: a button changes when selected, the task list updates, or a test passes.

That feedback makes it easier to spot problems early and continue with confidence. It's also why I tested the instructions step by step instead of relying on the writing alone.

The result is a small guide, but one where the explanations, code, and expected outcomes work together.

You can explore the [documentation](https://expo-developer-guide.thally.app/) and the [GitHub repository](https://github.com/Adejuwon-00/expo-developer-guide) to see the finished project.
