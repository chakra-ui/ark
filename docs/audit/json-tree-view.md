# Json Tree View Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/json-tree-view/`
- React files: `packages/react/src/components/json-tree-view/`
- Storybook/style files: `packages/angular/src/json-tree-view/json-tree-view.stories.ts`, `packages/angular/src/json-tree-view/json-tree-view-example-styles.ts`, `.storybook/modules/json-tree-view.module.css`

## Summary
- Status: Fixed focused Angular parity gaps for Storybook coverage, demo styling, and `useJsonTreeView` defaults.
- Highest-risk gaps: `json-tree-view` is layered on the generic Angular tree-view directives, so keyboard and focus behavior depend on the shared tree-view implementation. The audit kept changes scoped to JSON-specific behavior and demos.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Angular only exposed `Basic`, merged `DataTypes`, `RenderValue`, and `RootProvider`; React exposes separate examples for array data, map/set, regex, functions, expand level, render value, and root provider. | `packages/react/src/components/json-tree-view/json-tree-view.stories.tsx`; `packages/react/src/components/json-tree-view/examples/` | `packages/angular/src/json-tree-view/json-tree-view.stories.ts`; `packages/angular/src/json-tree-view/examples/` | Added focused Angular examples and stories for `ArrayData`, `MapAndSet`, `Regex`, `Functions`, `ExpandLevel`, and `Errors`; kept `DataTypes` as an Angular aggregate story. |
| Functionality parity | `useJsonTreeView` did not default to expanding one level and passed through typeahead, while React's hook defaults `defaultExpandedDepth` to `1` and forces `typeahead: false`. | `packages/react/src/components/json-tree-view/use-json-tree-view.ts` | `packages/angular/src/json-tree-view/use-json-tree-view.ts` | Defaulted `defaultExpandedDepth` to `1` in the hook and forced `typeahead: false`. |
| Styling parity | Angular example styles used a simplified layout and hard-coded colors instead of the React demo module's selectors, hover states, indentation, and CSS variables. | `.storybook/modules/json-tree-view.module.css` | `packages/angular/src/json-tree-view/json-tree-view-example-styles.ts` | Reworked Angular example styles to mirror the React demo selectors and CSS variable usage while keeping attribute-selector Angular examples. |
| Test parity | Defaults for `useJsonTreeView` were not covered. | React hook behavior in `packages/react/src/components/json-tree-view/use-json-tree-view.ts` | `packages/angular/src/json-tree-view/json-tree-view.spec.ts` | Added a spec for one-level default expansion and disabled typeahead. |
| Story parity | React has an `errors.tsx` example file that is not exported from its stories. | `packages/react/src/components/json-tree-view/examples/errors.tsx` | `packages/angular/src/json-tree-view/json-tree-view.stories.ts` | Added an Angular `Errors` story as useful parity coverage for the existing React example file. |

## Implementation Plan
1. Compare React and Angular source, stories, examples, and demo styling for `json-tree-view`.
2. Add missing Angular examples and story exports for data-shape coverage.
3. Align Angular `useJsonTreeView` hook defaults with React's hook.
4. Bring Angular example styles closer to the React Storybook CSS module.
5. Add focused Angular tests for the hook defaults.
6. Run focused verification and record results.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `bun run build`, and `bun run scripts/check-forms-isolation.ts`; the JSON Tree View secondary entry built successfully.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/json-tree-view/json-tree-view.spec.ts` passed with 9 tests.
- [x] Storybook render: First `bun run --cwd packages/angular storybook -- --ci --no-open --port 6007` attempt failed in unrelated `date-input`/`image-cropper` story compilation because the Webpack babel cache directory under `packages/angular/.angular/cache/21.2.11/babel-webpack` was missing. After creating that cache directory, the same command reached a listening Storybook dev server on port 6007; it stayed in watch/recompile mode and was stopped manually.
- [ ] Manual/visual checks: Deferred. No browser-side screenshot or side-by-side React/Angular visual inspection was captured in this run.

## Commit
- Hash: Recorded in final status after commit.
- Message: `fix(angular): align json tree view parity`
