# JSON Tree View Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/json-tree-view/json-tree-view.stories.ts`
- Angular examples: `packages/angular/src/json-tree-view/examples/`
- Angular styles: `packages/angular/src/json-tree-view/json-tree-view-example-styles.ts`
- React story: `packages/react/src/components/json-tree-view/json-tree-view.stories.tsx`
- React examples: `packages/react/src/components/json-tree-view/examples/`
- React styles: `.storybook/modules/json-tree-view.module.css`

## Summary

- Status: Fixed; Angular story exports now match the React story export surface, and `RootProvider` uses matching sample
  data.
- Highest-risk gaps: None remaining in story surface.

## Story Inventory

| Story name     | React | Angular | Notes                                                                                                          |
| -------------- | ----- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `Basic`        | Yes   | Yes     | Matching data and default expanded depth.                                                                      |
| `ArrayData`    | Yes   | Yes     | Matching arrays, non-enumerable properties, and sparse array setup.                                            |
| `MapAndSet`    | Yes   | Yes     | Matching Map and Set sample data.                                                                              |
| `Regex`        | Yes   | Yes     | Matching regex sample data.                                                                                    |
| `Functions`    | Yes   | Yes     | Matching function, async function, and generator array.                                                        |
| `ExpandLevel`  | Yes   | Yes     | Matching object data with `defaultExpandedDepth={2}` / `[defaultExpandedDepth]="2"`.                           |
| `DataTypes`    | No    | Removed | Angular-only aggregate demo removed from public Storybook surface.                                             |
| `Errors`       | No    | Removed | React has an example file, but the React story file does not export it; removed from public Storybook surface. |
| `RenderValue`  | Yes   | Yes     | Matching object and email render override.                                                                     |
| `RootProvider` | Yes   | Yes     | Angular data now matches React, including `email` and nested `address`.                                        |

## Example Data Sources

| Example        | Data origin                                       | Shape                                                                      | Dynamic/async                                             | Divergence                                                                                                |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Basic`        | Hard-coded object in example file.                | Person object with `name`, `age`, `email`, `tags`, and nested `address`.   | None.                                                     | None.                                                                                                     |
| `ArrayData`    | Hard-coded arrays plus `Object.defineProperties`. | Object containing normal array, non-enumerable array, and sparse array.    | Sparse array is created by an inline IIFE; deterministic. | None.                                                                                                     |
| `MapAndSet`    | Hard-coded `Map` / nested `Set`.                  | Map with string entries, scalar set values, and nested map/set of objects. | None.                                                     | None.                                                                                                     |
| `Regex`        | Hard-coded object.                                | Two `RegExp` values.                                                       | None.                                                     | None.                                                                                                     |
| `Functions`    | Hard-coded array.                                 | Named function, async arrow function, generator function.                  | Async function is present as data but not invoked.        | None.                                                                                                     |
| `ExpandLevel`  | Hard-coded object in example file.                | Same person object as `Basic`.                                             | None.                                                     | None.                                                                                                     |
| `DataTypes`    | Angular-only hard-coded object.                   | Mixed array/map/error/regex/function aggregate.                            | None.                                                     | Removed because there is no React story export counterpart.                                               |
| `Errors`       | Hard-coded `Error`.                               | `new Error('Error')`.                                                      | None.                                                     | Removed because React example exists, but React story does not export it.                                 |
| `RenderValue`  | Hard-coded object plus email helper.              | Person object with `number: Number.NaN` and nested address.                | None.                                                     | Angular href strips quotes before constructing `mailto`, while visible value remains rendered node value. |
| `RootProvider` | Hard-coded object inside hook options.            | Person object with default expanded depth.                                 | None.                                                     | Fixed; Angular now includes `email` and nested `address`.                                                 |

## Sections / Structure

- Meta differences: Both stories use `title: 'Utilities / JSON Tree View'` and no args, argTypes, tags, decorators, or
  parameters.
- Decorator differences: Angular wraps each example with `moduleMetadata({ imports: [...] })`; React re-exports each
  example directly.
- Per-story decorators / args / controls: Neither stack defines story args or controls. Angular render functions map to
  standalone example selectors.

## Styling

| Element                       | React selector / class                                                          | Angular selector / class                                            | Gap                                                             | Fix        |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- | ---------- |
| Root                          | `styles.Root`                                                                   | `[arkJsonTreeView]`, `[arkJsonTreeViewRootProvider]`                | No visual gap.                                                  | No change. |
| Tree                          | `styles.Tree`                                                                   | `[arkJsonTreeViewTree]`                                             | No visual gap.                                                  | No change. |
| Branch content / indent guide | `.Root [data-part='branch-content']`, `.Root [data-part='branch-indent-guide']` | `[data-part='branch-content']`, `[data-part='branch-indent-guide']` | No visual gap.                                                  | No change. |
| Branch control / item         | `.Root [data-part='branch-control']`, `.Root [data-part='item']`                | `[data-part='branch-control']`, `[data-part='item']`                | Angular includes equivalent layout, hover, and indent behavior. | No change. |
| Indicator                     | `.Root [data-part='branch-indicator']`                                          | `[data-part='branch-indicator']`                                    | No visual gap.                                                  | No change. |
| JSON syntax / values          | `.Tree [data-kind]`, `.Tree [data-type]`                                        | `[data-kind]`, `[data-type]`                                        | No visual gap.                                                  | No change. |

## Gap Matrix

| Area            | Gap                                                                                               | React reference                                                           | Angular location                                                | Fix                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Story inventory | Angular exports `DataTypes`; React does not.                                                      | `packages/react/src/components/json-tree-view/json-tree-view.stories.tsx` | `packages/angular/src/json-tree-view/json-tree-view.stories.ts` | Remove the `DataTypes` import/export and delete the unused example file. |
| Story inventory | Angular exports `Errors`; React story file does not export it even though a React example exists. | `packages/react/src/components/json-tree-view/json-tree-view.stories.tsx` | `packages/angular/src/json-tree-view/json-tree-view.stories.ts` | Remove the `Errors` import/export and delete the unused example file.    |
| Example data    | `RootProvider` sample object is shorter in Angular.                                               | `packages/react/src/components/json-tree-view/examples/root-provider.tsx` | `packages/angular/src/json-tree-view/examples/root-provider.ts` | Add `email` and nested `address` to Angular data.                        |

## Implementation Plan

1. Remove the Angular-only `DataTypes` and `Errors` stories and their unused example files.
2. Align `RootProvider` example data with the React object.
3. Re-run the focused json-tree-view spec, package typecheck, Storybook startup, and whitespace checks.
4. Update this audit with verification results and deferred gaps.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6232 --ci` reached `Storybook ready!` at
      `http://localhost:6232/`; stopped afterward with Ctrl-C.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/json-tree-view/json-tree-view.spec.ts` passed, 1
      file / 9 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/json-tree-view/json-tree-view.stories.ts packages/angular/src/json-tree-view/examples/root-provider.ts docs/story-audit/json-tree-view.md`
      passed after formatting the audit doc.
- [x] Whitespace: `git diff --check` passed. `git diff --no-index --check /dev/null docs/story-audit/json-tree-view.md`
      emitted no whitespace warnings; exit code `1` is expected for no-index differences.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align json-tree-view story with react parity`
