# Segment Group Angular Parity Audit

## Scope
- Angular files: `packages/angular/segment-group/`
- React files: `packages/react/src/components/segment-group/`
- Storybook/style files: `packages/angular/segment-group/segment-group.stories.ts`, `packages/angular/segment-group/examples/`, `packages/angular/segment-group/segment-group-example-styles.ts`, `packages/react/src/components/segment-group/segment-group.stories.tsx`, `packages/react/src/components/segment-group/examples/`, `.storybook/modules/segment-group.module.css`

## Summary
- Status: Fixed. Angular now matches React's Segment Group alias for public anatomy and visible part data attributes while keeping the underlying Zag radio-group behavior.
- Highest-risk gaps: The only component-level gap found was raw `radio-group` anatomy/scope leaking through visible Segment Group parts; this has been resolved locally.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| API / anatomy | `segmentGroupAnatomy` exposes the raw `@zag-js/radio-group` anatomy instead of the React `anatomy.rename('segment-group')` alias. Consumers inspecting anatomy get `radio-group` part attrs rather than `segment-group`. | `packages/react/src/components/segment-group/segment-group.anatomy.ts` | `packages/angular/segment-group/segment-group.anatomy.ts` | Export a renamed `segmentGroupAnatomy` and internal built parts. |
| DOM attributes / styling hooks | Visible Angular parts apply only Zag radio-group prop bags, so Storybook/test DOM has the underlying scope rather than React's `data-scope="segment-group"` after part attr merge. | `segment-group-root.tsx`, `segment-group-root-provider.tsx`, `segment-group-item.tsx`, `segment-group-item-control.tsx`, `segment-group-item-text.tsx`, `segment-group-label.tsx`, `segment-group-indicator.tsx` | Matching Angular directives under `packages/angular/segment-group/` | Merge renamed anatomy attrs after Zag props for root, root provider, label, item, item control, item text, and indicator. Leave hidden input unchanged because React does not merge anatomy attrs there. |
| Public API inputs | Angular root supports `id`, `ids` alias, `value`, `defaultValue`, `name`, `form`, `disabled`, `invalid`, `required`, `readOnly`, and `orientation`, matching React `UseSegmentGroupProps`. | `segment-group-root.tsx`, `use-segment-group.ts` | `segment-group-root.ts`, `use-segment-group.ts` | No change. |
| Behavior / forms | Angular covers value changes, disabled items, hidden inputs, default values, controlled model updates, RootProvider, field context merging, and CVA form-control integration. | React tests under `packages/react/src/components/segment-group/tests/` | `packages/angular/segment-group/segment-group.spec.ts` | No change except update data-scope expectations to the renamed segment-group scope. |
| Accessibility | Root/item behavior comes from the same Zag radio-group machine. Angular tests cover no disabled selection, labels/item text, hidden radio inputs, and CVA disabled state. React has an axe smoke test; Angular package does not have an axe harness for this component. | `packages/react/src/components/segment-group/tests/segment-group.test.tsx` | `packages/angular/segment-group/segment-group.spec.ts` | No component code change; note residual test coverage difference. |
| Shared exports / package wiring | Secondary entry point and Vite alias already exist for `./segment-group`; root anatomy barrel exports `segmentGroupAnatomy`. | N/A | `packages/angular/package.json`, `packages/angular/vite.config.ts`, `packages/angular/src/anatomy.ts` | Report no shared export/package edits required for this worker. |

## Implementation Plan
1. Rename Angular `segmentGroupAnatomy` to `anatomy.rename('segment-group')` and expose built internal parts.
2. Merge renamed part attrs after Zag prop bags in visible part directives.
3. Update segment-group specs to assert the React-parity `segment-group` scope and part attrs.
4. Run the focused segment-group spec and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; build completed and forms isolation reported `ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci segment-group/segment-group.spec.ts` passed: 1 file, 11 tests. Initial repo-root filter form `bun run --cwd packages/angular test:ci packages/angular/segment-group/segment-group.spec.ts` found no files because the command runs from `packages/angular`.
- [ ] Storybook render: Not run; story surface unchanged.
- [ ] Manual/visual checks: Not run; styling selectors unchanged and part attrs now match React.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
