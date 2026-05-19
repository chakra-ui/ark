# Tree View Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tree-view/**`
- React files: `packages/react/src/components/tree-view/**`
- Storybook/style files: `packages/angular/src/tree-view/tree-view.stories.ts`, `packages/angular/src/tree-view/tree-view-example-styles.ts`, `.storybook/modules/tree-view.module.css`

## Summary
- Status: Fixed the low-risk Angular parity gaps for this pass; render strategy, context-menu composition, and virtualized demo parity remain deferred.
- Highest-risk gaps: Angular tree-view does not yet expose React's render-strategy-driven `lazyMount`/`unmountOnExit` branch-content behavior; Angular has no tree-view context-menu demo because `asChild` composition with menu context triggers is not available in the Angular API shape.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `DisabledNode`, `Filtering`, `Links`, and `Mutation` demos. | `packages/react/src/components/tree-view/tree-view.stories.tsx` | `packages/angular/src/tree-view/tree-view.stories.ts` | Add Angular examples and stories. |
| Styling parity | Angular examples used a bordered card-like tree and did not include React's indentation, disabled, action, rename, and focus styles. | `.storybook/modules/tree-view.module.css` | `packages/angular/src/tree-view/tree-view-example-styles.ts` | Align Angular example styles to the React demo module using Angular attribute selectors. |
| Functionality parity | Recursive `NgTemplateOutlet` examples lost the root provider injector when rendering node templates outside the root element. | React examples use provider context through component nesting. | `packages/angular/src/tree-view/tree-view-root.ts`, `tree-view-root-provider.ts`, new recursive examples | Add root/root-provider context carriers and use their element injectors in the new recursive stories. |
| Public API parity | Root/root-provider do not expose React render strategy props `lazyMount` and `unmountOnExit`; branch content does not delegate to collapsible/presence. | `packages/react/src/components/tree-view/tree-view-root.tsx`, `tree-view-root-provider.tsx`, `tree-view-branch-content.tsx`, `examples/lazy-mount.tsx` | `packages/angular/src/tree-view/tree-view-root.ts`, `tree-view-root-provider.ts`, `tree-view-branch-content.ts` | Deferred: needs a per-node Angular render strategy design that preserves directive-centric templates. |
| Story parity | `ContextMenu` requires React `asChild` composition between `TreeView` parts and `Menu.ContextTrigger`. | `packages/react/src/components/tree-view/examples/context-menu.tsx` | No Angular story | Deferred: Angular menu/tree composition requires a separate context-trigger integration pattern. |
| Story parity | `Virtualized` uses `@tanstack/react-virtual`; the Angular package has no Angular virtualizer dependency. | `packages/react/src/components/tree-view/examples/virtualized.tsx` | No Angular story | Deferred: avoid adding a new Storybook/runtime dependency in this component-only pass. |

## Implementation Plan
1. Add Angular `DisabledNode`, `Filtering`, `Links`, and `Mutation` examples using the existing tree-view directives and shared file-tree helpers.
2. Export the new examples from `tree-view.stories.ts`.
3. Update tree-view example styles to match the React module's layout, indentation, disabled, action, focus, checkbox, and rename states with Angular selectors.
4. Add narrow Storybook compile smoke coverage for the added example components.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed, including production package build and forms-isolation check.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tree-view/tree-view.spec.ts` passed, 14 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --ci --smoke-test` compiled and exited successfully; Storybook emitted existing unused-compilation warnings and a `DefinePlugin` warning.
- [x] Manual/visual checks: Compared Angular example styles against `.storybook/modules/tree-view.module.css`; deferred browser pixel inspection for this pass.

## Re-audit
- Re-audit confirmed all addressable React parity gaps remain closed: `DisabledNode`, `Filtering`, `Links`, `Mutation`, `RenameNode`, `AsyncLoading`, `CheckboxTree`, `ControlledExpanded`, `ControlledSelected`, `ExpandCollapseAll`, `RootProvider`, and `Basic` stories are present and exported from `tree-view.stories.ts`; example styles in `tree-view-example-styles.ts` match the React module's selectors for branch, item, indicator, indent guide, node-checkbox, rename input, action group, filter input, and presence animations.
- Re-verified `bun run --cwd packages/angular test:ci src/tree-view/tree-view.spec.ts` — 14 tests pass.
- The three originally deferred gaps remain deferred with the same rationale: `LazyMount` (render-strategy on branch content requires changing `arkTreeViewBranchContent` from a directive to a structural-control or component that gates rendering via collapsible state per node; risks regressing the directive-centric public API and existing branch-content tests), `ContextMenu` (requires `asChild` composition with `Menu.ContextTrigger` which the Angular directive-centric API does not currently expose), and `Virtualized` (requires an Angular virtualizer dependency not in scope for this component-only pass).

## Commit
- Hash: e770b4326 (initial pass) — re-audit confirmed no additional source changes required for this iteration; audit doc updated to record re-audit verification.
- Message: `fix(angular): align tree-view with react parity`
