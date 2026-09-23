---
'@ark-ui/codemod': minor
---

Add `@ark-ui/codemod`, a CLI for migrating Ark UI codebases between versions.

```sh
npx @ark-ui/codemod list
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx" --dry
```

Ships the `asChild` → `render` migration as one transform per framework, because the shape of the change differs:
React and Vue move the child element into a prop or a slot, while Solid and Svelte are renames with a signature change.

`--dry` prints a diff and writes nothing. Without it the codemod refuses to run on a dirty working tree, so a bad run
is one `git checkout` away. Anything ambiguous is left alone and reported with a file and a reason rather than guessed.
