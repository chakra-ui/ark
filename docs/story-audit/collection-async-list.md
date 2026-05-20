# Collection Async List Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/collection/async-list.stories.ts`
- Angular examples: `packages/angular/src/collection/examples/async-list-*.ts`
- Angular styles: `packages/angular/src/collection/async-list-example-styles.ts`
- React story: `packages/react/src/components/collection/async-list.stories.tsx`
- React examples: `packages/react/src/components/collection/examples/async-list/*.tsx`
- React styles: `.storybook/modules/async-list.module.css`, `.storybook/modules/button.module.css`,
  `.storybook/modules/field.module.css`

## Summary

- Status: Fixed. Angular now exposes the same Storybook story list, order, example data shape, async behavior, and demo
  styling surface as React.
- Highest-risk gaps: Angular does not have a framework hook equivalent to React `useAsyncList`, so examples drive
  `@zag-js/async-list` through the exported machine actions and `connectAsyncList`.

## Story Inventory

| Story name      | React | Angular | Notes                                                                    |
| --------------- | ----- | ------- | ------------------------------------------------------------------------ |
| Dependencies    | Yes   | Yes     | Added Angular story and example.                                         |
| InfiniteLoading | Yes   | Yes     | Added Angular story and example.                                         |
| Reload          | Yes   | Yes     | Updated Angular data source and layout.                                  |
| Filter          | Yes   | Yes     | Updated Angular data set, limit, copy, and layout.                       |
| SortClientSide  | Yes   | Yes     | Updated Angular data source, loading state, table layout, and sort copy. |
| SortServerSide  | Yes   | Yes     | Added Angular story and example.                                         |

## Example Data Sources

| Example         | Data origin                                  | Shape                                                                             | Dynamic/async                                                             | Divergence                                                                                        |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Dependencies    | Local `mockUsers` array copied from React    | 20 users with `id`, `name`, `email`, `department`, `role`; limited to 5           | 400 ms delay; reloads when department/role changes; filters by name/email | Angular manually calls `reload()` on dependency changes because there is no Angular hook watcher. |
| InfiniteLoading | `https://jsonplaceholder.typicode.com/posts` | `Post` with `userId`, `id`, `title`, `body`; pages of 4                           | Auto loads on init; `loadMore()` appends by cursor                        | No story-surface divergence.                                                                      |
| Reload          | `https://dummyjson.com/quotes`               | `Quote` with `id`, `quote`, `author`; limit 4                                     | Auto loads on init; `Math.random()` skip like React                       | No story-surface divergence.                                                                      |
| Filter          | Local `mockUsers` array copied from React    | 20 users with `id`, `name`, `email`, `department`, `role`; limited to 4           | 500 ms delay; filters by name/email                                       | No story-surface divergence.                                                                      |
| SortClientSide  | `https://jsonplaceholder.typicode.com/users` | `User` with `id`, `name`, `username`, `email`, `phone`, `website`; limit 5        | Auto loads on init; sorts current items with `Intl.Collator`              | Angular uses `Intl.Collator` directly instead of React locale hook.                               |
| SortServerSide  | `https://fakestoreapi.com/products`          | Product with `id`, `title`, `price`, `description`, `category`, `image`, `rating` | Auto loads on init; reloads server data with `sort=asc/desc`              | No story-surface divergence.                                                                      |

## Sections / Structure

- Meta differences: None. Both stories use `title: 'Utilities / Async List'`.
- Decorator differences: Angular wraps each story in `moduleMetadata` imports for standalone example components; React
  re-exports function examples directly.
- Per-story decorators / args / controls: Neither stack defines story args, controls, tags, or per-story parameters.

## Styling

| Element        | React selector / class                             | Angular selector / class                | Gap                                                                        | Fix                                                                                     |
| -------------- | -------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Root           | `styles.Root`                                      | `.root`                                 | Angular examples had per-file minimal grid CSS.                            | Added shared async-list styles matching React layout, width, gap, color, and centering. |
| Header         | `styles.Header`                                    | `.header`                               | Angular header spacing and wrapping differed.                              | Added shared flex wrapping header styles.                                               |
| Button         | `button.Root`                                      | `.button`                               | Angular native buttons lacked shared state styling.                        | Added shared button styles matching React button module.                                |
| Field controls | `field.Input`, `field.Select`                      | `.input`, `.select`                     | Angular input/select styling was incomplete.                               | Added shared input/select styles matching React field module.                           |
| Items          | `styles.ItemGroup`, `styles.Item`, content classes | `.item-group`, `.item`, content classes | Angular item layout, hover, borders, and metadata differed.                | Added shared item/content/meta/media styles and updated templates.                      |
| Table          | `styles.Table`                                     | `.table`                                | Angular table padding, header background, hover, and icon sizing differed. | Added shared table styles and updated client sort template.                             |
| Loading        | `styles.Loading`, `styles.Spinner`                 | `.loading`, `.spinner`                  | Angular used plain text status.                                            | Added loading row and CSS spinner.                                                      |
| Empty/Error    | `styles.Empty`, `styles.Error`                     | `.empty`, `.error`                      | Angular status/error surface differed.                                     | Added shared empty/error styles and copy parity.                                        |

## Gap Matrix

| Area             | Gap                                                                 | React reference                                           | Angular location                     | Fix                                                                              |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| Story list       | Angular missed `Dependencies`, `InfiniteLoading`, `SortServerSide`. | `async-list.stories.tsx` exports six examples.            | `async-list.stories.ts`              | Added missing exports in React order.                                            |
| Reload data      | Angular used local quote batches and different copy.                | `reload.tsx` fetches dummyjson quotes.                    | `async-list-reload.ts`               | Switched to dummyjson fetch, quote shape, loading button, and item copy.         |
| Filter data      | Angular used 4 local users with `team`.                             | `filter.tsx` uses 20 users with `department` and `role`.  | `async-list-filter.ts`               | Copied React data shape and limit behavior.                                      |
| Client sort data | Angular used local 3-user data.                                     | `sort-client-side.tsx` fetches 5 jsonplaceholder users.   | `async-list-sort-client-side.ts`     | Switched to fetch, loading/error status, collator sort, and React table columns. |
| Server sort      | Angular missing.                                                    | `sort-server-side.tsx` fetches fakestore products.        | New `async-list-sort-server-side.ts` | Added example with server sort query and product card rendering.                 |
| Infinite loading | Angular missing.                                                    | `infinite-loading.tsx` fetches paged posts.               | New `async-list-infinite-loading.ts` | Added cursor-based load more example.                                            |
| Dependencies     | Angular missing.                                                    | `dependencies.tsx` filters with selected department/role. | New `async-list-dependencies.ts`     | Added select/input filters and manual dependency reload.                         |

## Implementation Plan

1. Add a shared Angular async-list demo style module that mirrors React CSS module selectors.
2. Add missing Angular examples for dependencies, infinite loading, and server-side sorting.
3. Update existing reload, filter, and client-side sort examples to match React data sources and rendering.
4. Reorder Angular story exports to match React exactly.
5. Run scoped specs, package typecheck, Storybook startup, Prettier, and diff checks.

## Deferred (component-level work)

- None.

## Verification

- [x] `bun prettier --write packages/angular/src/collection/async-list.stories.ts packages/angular/src/collection/async-list-example-styles.ts packages/angular/src/collection/examples/async-list-dependencies.ts packages/angular/src/collection/examples/async-list-infinite-loading.ts packages/angular/src/collection/examples/async-list-reload.ts packages/angular/src/collection/examples/async-list-filter.ts packages/angular/src/collection/examples/async-list-sort-client-side.ts packages/angular/src/collection/examples/async-list-sort-server-side.ts`:
      passed.
- [x] `bun run --cwd packages/angular test:ci src/collection/collection.spec.ts`: passed, 1 file / 12 tests.
- [x] `bun run --cwd packages/angular storybook -- --port 6013 --ci`: passed startup/compile with exit code 0.
- [x] Scoped `git diff --check -- packages/angular/src/collection/...`: passed.
- [x] `git diff --check`: passed.
- [x] `git diff --no-index --check /dev/null docs/story-audit/collection-async-list.md`: no whitespace errors reported.
- [ ] `bun run --cwd packages/angular typecheck`: failed in unrelated spec compile with
      `progress/progress.spec.ts(33,34): error TS2307: Cannot find module '@ark-ui/angular/providers/locale' or its corresponding type declarations.`
- [ ] Browser side-by-side visual check: not performed.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align async-list story with react parity`
