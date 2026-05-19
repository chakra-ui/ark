# Json Tree View Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/json-tree-view/`
- React files: `packages/react/src/components/json-tree-view/`
- Storybook/style files: `packages/angular/src/json-tree-view/json-tree-view.stories.ts`, `packages/angular/src/json-tree-view/json-tree-view-example-styles.ts`, `.storybook/modules/json-tree-view.module.css`

## Summary
- Status: Re-audited. Previous pass aligned story coverage, hook defaults, and demo CSS variables. This pass closes follow-up gaps: arrow indicator rendering, story arrow templates, colon spacing, indicator CSS, and render-value example shape.
- Highest-risk gaps: Angular layered `json-tree-view` on the shared tree-view directives, so keyboard, focus, and ARIA behavior depend on the underlying tree-view implementation; changes were kept scoped to JSON-specific concerns.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Functionality parity | Angular always rendered a `branch-indicator` span with a default `›` glyph when no arrow template was provided. React only renders `TreeView.BranchIndicator` when `arrow` is truthy, so consumers can opt-out of the indicator entirely. | `packages/react/src/components/json-tree-view/json-tree-view-node.tsx` (`{arrow && <TreeView.BranchIndicator>...}`) | `packages/angular/src/json-tree-view/json-tree-view-node.ts` | Made the indicator template conditional on `arrow()` being provided; removed the fallback `›` glyph. |
| Story parity | React Storybook examples uniformly pass a `ChevronRightIcon` to `JsonTreeView.Tree.arrow`. Angular stories rendered without any arrow template, so default-state branch markers diverged visually. | All `packages/react/src/components/json-tree-view/examples/*.tsx` | `packages/angular/src/json-tree-view/examples/*.ts` | Added an inline chevron SVG `ng-template #arrow` and wired it to `arkJsonTreeViewTree`'s `[arrow]` input in `basic`, `array-data`, `map-and-set`, `regex`, `functions`, `expand-level`, `errors`, `render-value`, and `root-provider`. |
| Story parity | Angular `Basic` example set `quotesOnKeys`, which React's `Basic` does not. This subtly diverged the rendered output (`"name"` vs `name`). | `packages/react/src/components/json-tree-view/examples/basic.tsx` | `packages/angular/src/json-tree-view/examples/basic.ts` | Removed `quotesOnKeys` from the `Basic` example to match React. |
| Story parity | React `RenderValue` story uses `defaultExpandedDepth={2}` and the renderer returns nothing (the default text falls through) for non-email values. Angular used `1` and had an `@else` branch echoing the value, double-rendering text. | `packages/react/src/components/json-tree-view/examples/render-value.tsx` | `packages/angular/src/json-tree-view/examples/render-value.ts` | Set `defaultExpandedDepth` to `2`, added `target="_blank" rel="noreferrer"` to the link, and dropped the redundant `@else` branch so non-matching values fall through to default rendering. |
| Styling parity | Angular key node rendered the colon glyph as `:` with no trailing space; React renders `: ` with a trailing space inside the `data-kind="colon"` span. While CSS `margin-inline` masks most of the visual gap, the DOM text content differed across frameworks. | `packages/react/src/components/json-tree-view/json-tree-view-key-node.tsx` | `packages/angular/src/json-tree-view/json-tree-view-key-node.ts` | Added the trailing space to the colon span to match React. |
| Styling parity | Angular example styles forced `width: 1rem` on `[data-part='branch-indicator']`, which React does not. React only sizes `svg` icons inside `.Tree` to `1rem`. The Angular rule widened the slot even when no arrow was present. | `.storybook/modules/json-tree-view.module.css` (`.Tree svg { width: 1rem; height: 1rem; }`) | `packages/angular/src/json-tree-view/json-tree-view-example-styles.ts` | Removed `width: 1rem` from `[data-part='branch-indicator']` and added an `[arkJsonTreeViewTree] svg { width: 1rem; height: 1rem; }` rule to mirror React's icon sizing. |

### Previously addressed gaps (kept for record)
| Area | Gap | Status |
| --- | --- | --- |
| Story parity | Angular only exposed `Basic`, `DataTypes`, `RenderValue`, and `RootProvider`; React exposes separate examples for array, map/set, regex, functions, expand level, render value, and root provider. | Closed in prior pass via individual Angular example components and story exports (still in place). |
| Functionality parity | `useJsonTreeView` lacked `defaultExpandedDepth = 1` default and did not force `typeahead: false`. | Closed in prior pass. |
| Styling parity | Demo styles lacked React's CSS module selectors and CSS variable usage. | Closed in prior pass; this pass refines indicator/icon sizing. |
| Test parity | No coverage for `useJsonTreeView` defaults. | Closed in prior pass; spec retained. |
| Story parity | Angular lacked an `Errors` example to mirror `errors.tsx`. | Closed in prior pass; arrow template added this pass. |

## Implementation Plan
1. Re-read React reference and previous Angular audit to identify residual gaps.
2. Make the branch indicator opt-in (only when an arrow template is provided).
3. Restore the colon trailing space inside the key node.
4. Bring all Angular Storybook examples in line with React's chevron arrow template usage; remove `quotesOnKeys` from `Basic`; align `RenderValue` shape with React (depth 2, no else branch, `target="_blank" rel="noreferrer"`).
5. Drop the `width: 1rem` rule from the indicator and instead size icons under `[arkJsonTreeViewTree] svg` to match React's `.Tree svg` rule.
6. Re-run focused verification.

## Verification
- [x] Typecheck: `tsc -p tsconfig.json --noEmit` and `tsc -p tsconfig.spec.json --noEmit` (run directly from `packages/angular`) both completed with no diagnostics.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/json-tree-view/json-tree-view.spec.ts` — 9 tests passed.
- [ ] Full `bun run --cwd packages/angular typecheck`: the chained `bun run build` step failed with `Build output package.json does not exist at packages/angular/dist/package.json` from `scripts/hide-private-entrypoints.ts`. The failure was triggered by concurrent writes to `dist/` while other parallel agents were modifying sibling components; the json-tree-view-specific tsc passes (above) succeeded.
- [ ] Storybook render: Not re-run in this pass to avoid contention with concurrent component agents writing to `.angular/cache`. Storybook started successfully in the prior pass after seeding the babel-webpack cache directory.
- [ ] Manual/visual checks: Deferred. No browser side-by-side capture in this pass.

## Commit
- Hash: 2c2b1c4ab
- Message: `fix(angular): align json-tree-view with react parity`
