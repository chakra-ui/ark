# Contributing to Ark UI

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Report bugs using Github's [issues](https://github.com/chakra-ui/ark/issues)

We use GitHub issues to track public bugs. Report a bug by
[opening a new issue](https://github.com/chakra-ui/ark/issues/new); it's that easy!

## License

By contributing, you agree that your contributions will be licensed under its
[License](https://github.com/chakra-ui/ark/blob/main/LICENSE).

## Set up the repo

Ark is a bun monorepo. You need [bun](https://bun.sh) installed.

```bash
bun install
bun run build
```

Run a framework's Storybook on port 6006:

```bash
bun run react dev   # or: solid, svelte, vue
```

The checks CI runs:

```bash
bun run typecheck
bun run test
bun run lint
bun run format
```

## Pick the right base branch

Most work targets `main`.

Work on the next major targets [`v6`](https://github.com/chakra-ui/ark/tree/v6). It's a long-lived branch that merges
into `main` once, at the end, so branch from `v6` and open your PR against `v6`. See
[the v6 roadmap](https://github.com/chakra-ui/ark/discussions/3997) for what's in scope.

## Keep the frameworks in sync

Ark ships the same component API for React, Solid, Svelte and Vue. A change to one framework usually belongs in the
other three, in the same PR.

If you can only do one, say so in the PR description and open an issue for the rest. A framework left behind is how
components drift apart.

## Add a changeset

Any change users can see needs a changeset:

```bash
bun changeset
```

Pick the packages you touched, pick the bump, and write the entry as release notes — what changed and why it matters to
someone upgrading, not what you did to the code. Skip it for changes with no user-facing effect, like CI or internal
refactors.

## Discuss changes before starting to work on them

Please first discuss the change you wish to make via issue, email, or any other method with the owners of this
repository before making a change. This helps everyone to be on the same page and makes the chances of your
contributions being integrated into the project much higher.

## Do a self-review before requesting a review from others

Before requesting a review for your pull request, do a self-review. Go through your code additions and make sure they
follow the coding practices and guidelines of the project. This helps to streamline the review process and reduce the
iteration cycles of review.
