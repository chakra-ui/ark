# @ark-ui/codemod

Codemods for migrating Ark UI codebases between versions.

```sh
npx @ark-ui/codemod list
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx" --dry
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx"
```

Run it without a transform in a terminal and it prompts you to pick one or more — handy when a library ships across
frameworks and you want to migrate every package in one run — then reports progress per transform. Pipe it or run it
in CI (no TTY) and it stays non-interactive: pass the transform as an argument and it prints plain output, so scripts
never hang on a prompt.

## Try it first

`--dry` prints a diff and writes nothing:

```sh
npx @ark-ui/codemod vue/as-child-to-render "src/**/*.vue" --dry
```

```diff
src/components/menu.vue
-     <Popover.Trigger asChild>
-       <button>Open Popover</button>
+     <Popover.Trigger #render="{ props }">
+       <button v-bind="props">Open Popover</button>

vue/as-child-to-render  scanned 214 files, would change 12 (14 sites)
```

Pass `--no-diff` for just the summary.

Without `--dry` the codemod refuses to run on a dirty working tree, so a bad run is one `git checkout` away. `--force`
overrides that.

## Options

| Option              | Default   | What it does                            |
| ------------------- | --------- | --------------------------------------- |
| `-d, --dry`         | `false`   | Report what would change, write nothing |
| `--no-diff`         | —         | In a dry run, print only the summary    |
| `-e, --exclude`     | —         | Globs to skip                           |
| `-c, --concurrency` | cpu count | Files to process at once                |
| `--force`           | `false`   | Run even with uncommitted changes       |
| `--cross-file`      | `false`   | Resolve ark parts imported through local barrels (react, solid) |

Paths are globs, `**/*` by default. `.gitignore`, `node_modules` and `dist` are always skipped.

## Transforms

| Transform                   | Files          |
| --------------------------- | -------------- |
| `react/as-child-to-render`  | `.tsx`, `.jsx` |
| `solid/as-child-to-render`  | `.tsx`, `.jsx` |
| `vue/as-child-to-render`    | `.vue`         |
| `svelte/as-child-to-render` | `.svelte`      |

See [docs/AS_CHILD_MIGRATION.md](./docs/AS_CHILD_MIGRATION.md) for what each one does and what it leaves for you.

## Scope

The React, Solid and Vue transforms only touch Ark UI parts — elements whose tag resolves to an `@ark-ui/*` import, following aliases (`import { Menu as M }`) and the `ark` factory. Another library's `asChild` (Radix, for one) in the same file is left alone, and a file that never imports Ark is skipped. The Svelte transform keys off the Ark-specific `asChild` snippet name instead.

If you re-export Ark parts through a local barrel — `import { Menu } from '@/components/ui'` where `ui` re-exports `@ark-ui/react/menu` — pass `--cross-file` (React and Solid). It resolves the import back to `@ark-ui/*` through direct, transitive, aliased, `export *`, and import-then-reexport chains, using the nearest `tsconfig.json` for path aliases. It is off by default because it reads sibling files.

## What it will not do

A codemod that guesses is worse than one that stops. Anything ambiguous is left alone and reported:

```
3 site(s) left for you:
  src/menu.tsx        line 12: expected exactly one child element, found 2
  src/dialog.tsx      line 40: asChild={cond} is not a plain boolean
  src/panel.svelte    offset 302: bare asChild attribute, needs a render snippet by hand
```

Every line names the file and why, so the remainder is a worklist rather than a mystery.
