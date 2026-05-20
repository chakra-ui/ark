# Pagination Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/pagination/pagination.stories.ts`
- Angular examples: `packages/angular/src/pagination/examples/*.ts`
- Angular styles: `packages/angular/src/pagination/pagination-example-styles.ts`
- React story: `packages/react/src/components/pagination/pagination.stories.tsx`
- React examples: `packages/react/src/components/pagination/examples/*.tsx`
- React styles: `.storybook/modules/pagination.module.css`

## Summary

- Status: aligned after focused story-surface fixes.
- Highest-risk gaps: none remaining at the Storybook surface level.

## Story Inventory

| Story name      | React | Angular | Notes                                                                       |
| --------------- | ----- | ------- | --------------------------------------------------------------------------- |
| Basic           | Yes   | Yes     | Inventory and order match.                                                  |
| Context         | Yes   | Yes     | Angular now uses matching chevron control icons.                            |
| Controlled      | Yes   | Yes     | Angular-only page readout removed to match React.                           |
| Customized      | Yes   | Yes     | Translation data matches React; triggers now use matching icons.            |
| DataSlicing     | Yes   | Yes     | User fixture shape and length match React.                                  |
| Link            | Yes   | Yes     | Link-mode pagination config matches React; triggers now use matching icons. |
| PageRange       | Yes   | Yes     | Range copy and page count match React.                                      |
| PageSizeControl | Yes   | Yes     | Select options and page-size state behavior match React.                    |
| RootProvider    | Yes   | Yes     | Outer control copy and provider layout now match React.                     |
| WithEdges       | Yes   | Yes     | First/prev/next/last controls now use matching chevron icons.               |

## Example Data Sources

| Example         | Data origin                   | Shape                                                        | Dynamic/async                                  | Divergence                                                                              |
| --------------- | ----------------------------- | ------------------------------------------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| Basic           | Hard-coded pagination props   | `count=5000`, `pageSize=10`, `siblingCount=2`                | None                                           | None.                                                                                   |
| Context         | Pagination context API        | `count=100`, `pageSize=10`                                   | Button handlers call navigation methods        | None.                                                                                   |
| Controlled      | Local state                   | Current page signal/state starts at `1`                      | Page changes update controlled state           | Angular uses `[(page)]`; framework-idiomatic equivalent to React `page`/`onPageChange`. |
| Customized      | Inline translations object    | `nextTriggerLabel`, `prevTriggerLabel`, `itemLabel`          | None                                           | None.                                                                                   |
| DataSlicing     | Local `users` fixture         | 20 `{ id, name, email }` records                             | `pagination.slice(users)` derives visible page | None.                                                                                   |
| Link            | `usePagination` configuration | Link mode with `getPageUrl: ({ page }) => \`/page=${page}\`` | None                                           | Angular wraps `usePagination` in injection context; framework-idiomatic equivalent.     |
| PageRange       | Pagination context API        | `count=100`, `pageSize=10`                                   | Derived `pageRange`, `count`, `totalPages`     | None.                                                                                   |
| PageSizeControl | Pagination context API        | Select options `5`, `10`, `20`, `50`                         | Change handler calls `setPageSize`             | None.                                                                                   |
| RootProvider    | `usePagination` configuration | `count=5000`, `pageSize=10`, `siblingCount=2`                | External button calls `goToNextPage`           | Angular wraps `usePagination` in injection context; framework-idiomatic equivalent.     |
| WithEdges       | Hard-coded pagination props   | `count=5000`, `pageSize=20`, `siblingCount=2`                | None                                           | None.                                                                                   |

## Sections / Structure

- Meta differences: both stories use `title: 'Components / Pagination'`; neither defines args, argTypes, tags,
  parameters, or decorators at meta level.
- Decorator differences: React re-exports example functions directly. Angular uses per-story `moduleMetadata` imports
  and a render template for each standalone example component.
- Per-story decorators / args / controls: Angular stories use one `moduleMetadata` decorator per example and no story
  args or controls; React examples export plain components with no story args or controls.

## Styling

| Element                         | React selector / class                                   | Angular selector / class                                                                                 | Gap                                                                                                     | Fix                                                                             |
| ------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Root layout                     | `.Root`                                                  | `.pagination-root`                                                                                       | No gap.                                                                                                 | No change.                                                                      |
| Controls row                    | `.Controls`                                              | `.pagination-controls`                                                                                   | No gap.                                                                                                 | No change.                                                                      |
| Page item                       | `.Item`                                                  | `.pagination-item`                                                                                       | No gap.                                                                                                 | No change.                                                                      |
| Prev/next/edge triggers         | `.Trigger` with lucide icons                             | `.pagination-trigger` with text arrows/labels                                                            | Angular rendered text controls instead of the React icon surface.                                       | Added local chevron icon components and used them in all icon-control examples. |
| Context page count              | `.Text` plus inline `minWidth: 120px; textAlign: center` | `.pagination-page-count`                                                                                 | No gap.                                                                                                 | No change.                                                                      |
| Page size row                   | `.hstack`, `.Text`, `.PageSizeSelect`                    | `.pagination-page-size`, `.pagination-text`, `.pagination-page-size-select`                              | Angular gap was tighter and the select had no dedicated class.                                          | Matched `1rem` row gap and added a select class.                                |
| Stacked text / provider wrapper | global `.stack`                                          | `.pagination-stack`                                                                                      | Angular stack gap was tighter; RootProvider placed root styles on the wrapper instead of provider root. | Matched stack spacing and moved `.pagination-root` to the provider root.        |
| Data grid                       | `.Grid`, `.GridItem`, `.GridItemTitle`, `.GridItemText`  | `.pagination-grid`, `.pagination-grid-item`, `.pagination-grid-item-title`, `.pagination-grid-item-text` | No gap.                                                                                                 | No change.                                                                      |

## Gap Matrix

| Area                      | Gap                                                                            | React reference                                                                                   | Angular location                                               | Fix                                                                      |
| ------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Control iconography       | Prev/next/edge controls used text labels/arrows.                               | `ChevronLeftIcon`, `ChevronRightIcon`, `ChevronsLeftIcon`, `ChevronsRightIcon` in React examples. | `packages/angular/src/pagination/examples/*.ts`                | Added pagination icon components and rendered them in matching controls. |
| Controlled story content  | Angular displayed an extra `Page {{ page() }}` output.                         | `controlled.tsx` renders only controls.                                                           | `packages/angular/src/pagination/examples/controlled.ts`       | Removed the Angular-only output.                                         |
| RootProvider outer button | Angular outer button rendered `>` and the provider root lacked the root class. | `root-provider.tsx` renders `Next Page`, outer `.stack`, provider `.Root`.                        | `packages/angular/src/pagination/examples/root-provider.ts`    | Matched button copy and class placement.                                 |
| Layout spacing            | Page-size and stack helpers used tighter spacing than React utilities.         | `.hstack` and `.stack` in Storybook utilities.                                                    | `packages/angular/src/pagination/pagination-example-styles.ts` | Updated local Angular helper spacing to `1rem`.                          |

## Implementation Plan

1. Keep story export inventory/order unchanged because it already matches React.
2. Add local standalone chevron icon components matching the React lucide icons used by pagination.
3. Replace Angular text arrows/labels with the matching icon components where React uses icons.
4. Remove the Angular-only controlled page output.
5. Align RootProvider copy/class placement and pagination helper spacing.
6. Run formatting, pagination spec, Angular typecheck, Storybook startup, and whitespace checks.

## Deferred (component-level work)

- None.

## Verification

- [x] Formatting:
      `bun prettier --write packages/angular/src/pagination/pagination.stories.ts packages/angular/src/pagination/pagination-example-styles.ts packages/angular/src/pagination/examples/*.ts docs/story-audit/pagination.md`
      passed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/pagination/pagination.spec.ts` passed, 1 file / 9
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed on rerun, including production build and
      `forms isolation: ok`. The first attempt failed during concurrent unrelated Popover edits because
      `src/popover/popover.stories.ts` imported `./examples/with-dialog` before that file existed.
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6240 --ci` reached Storybook ready at
      `http://localhost:6240/`; stopped after startup. Existing warnings only: unused TS compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [x] `git diff --check`: passed.
- [ ] Visual check of each story: not performed side-by-side in a browser.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align pagination story with react parity`.
- Note: `docs/story-audit/pagination.md` is ignored by the local `docs/` exclude, so the parent commit needs
  `git add -f docs/story-audit/pagination.md`.
