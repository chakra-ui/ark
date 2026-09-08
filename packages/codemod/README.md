# @ark-ui/codemod

Codemods for migrating Ark UI codebases between versions.

```sh
npx @ark-ui/codemod list
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx" --dry
npx @ark-ui/codemod react/as-child-to-render "src/**/*.tsx"
```

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

Paths are globs, `**/*` by default. `.gitignore`, `node_modules` and `dist` are always skipped.

## Transforms

| Transform                   | Files          |
| --------------------------- | -------------- |
| `react/as-child-to-render`  | `.tsx`, `.jsx` |
| `solid/as-child-to-render`  | `.tsx`, `.jsx` |
| `vue/as-child-to-render`    | `.vue`         |
| `svelte/as-child-to-render` | `.svelte`      |

See [docs/AS_CHILD_MIGRATION.md](./docs/AS_CHILD_MIGRATION.md) for what each one does and what it leaves for you.

## What it will not do

A codemod that guesses is worse than one that stops. Anything ambiguous is left alone and reported:

```
3 site(s) left for you:
  src/menu.tsx        line 12: expected exactly one child element, found 2
  src/dialog.tsx      line 40: asChild={cond} is not a plain boolean
  src/panel.svelte    offset 302: bare asChild attribute, needs a render snippet by hand
```

Every line names the file and why, so the remainder is a worklist rather than a mystery.
