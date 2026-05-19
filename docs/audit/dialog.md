# Dialog Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/dialog/`
- React files: `packages/react/src/components/dialog/`
- Storybook/style files: `packages/angular/src/dialog/dialog.stories.ts`, `packages/angular/src/dialog/dialog-example-styles.ts`, `.storybook/modules/dialog.module.css`

## Summary
- Status: Fixed focused Angular parity gaps for the dialog root API, valued triggers, callback outputs, Storybook examples, and demo styles. `OpenFromMenu` remains deferred because it depends on cross-component menu example parity outside this component-only pass.
- Highest-risk gaps: controlled trigger value propagation, focus target callbacks, and callback output parity for dismissable-layer events.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Dialog root omitted `aria-label`, `trapFocus`, `restoreFocus`, focus target callbacks, persistent elements, trigger value controls, and dismissable-layer callback outputs. | `packages/react/src/components/dialog/use-dialog.ts`, `packages/solid/src/components/dialog/dialog-root.tsx`, Zag `DialogProps` | `packages/angular/src/dialog/dialog-root.ts`, `packages/angular/src/dialog/dialog.types.ts`, `packages/angular/src/dialog/public-api.ts` | Added missing inputs/models/outputs and public event/detail types while preserving Angular signal/model/output conventions. |
| Public API parity | Dialog triggers could not pass the identifying trigger `value` to Zag. | `packages/react/src/components/dialog/examples/multiple-triggers.tsx`, Zag `getTriggerProps(props)` | `packages/angular/src/dialog/dialog-trigger.ts` | Added a signal `value` input and passed it into `api().getTriggerProps({ value })`. |
| Story parity | Angular Storybook only covered Basic, Controlled, DefaultOpen, NonModal, AlertDialog, and RootProvider. | `packages/react/src/components/dialog/dialog.stories.tsx` | `packages/angular/src/dialog/dialog.stories.ts`, `packages/angular/src/dialog/examples/` | Added Confirmation, Context, FinalFocus, InitialFocus, InsideScroll, LazyMount, MultipleTriggers, Nested, OutsideScroll, and RapidStateChange examples. |
| Styling parity | Angular demo styles missed React module animation, nested-layer, action/body, field, and scroll-layout styling. | `.storybook/modules/dialog.module.css` | `packages/angular/src/dialog/dialog-example-styles.ts` | Expanded example styles for backdrop/content animations, z-index, scroll containers, action rows, fields, and outside-scroll layout. |
| Test parity | Angular tests did not cover valued triggers, `aria-label`, callback outputs, or the added examples. | `packages/react/src/components/dialog/tests/dialog.test.tsx` | `packages/angular/src/dialog/dialog.spec.ts` | Added focused specs for public type smoke, content label, trigger value model/output, escape callback output, and example mounting. |
| Story parity | React has `OpenFromMenu`; implementing the Angular equivalent requires menu example styling and behavior outside the dialog component scope. | `packages/react/src/components/dialog/examples/open-from-menu.tsx` | `packages/angular/src/dialog/dialog.stories.ts` | Deferred; documented as a cross-component example gap. |
| API design | React `Dialog.Context` has no direct Angular directive equivalent. | `packages/react/src/components/dialog/dialog-context.tsx` | `packages/angular/src/dialog/examples/context.ts` | No change to public API; Angular exposes the root via `exportAs="arkDialog"` and DI, so the Context example reads `root.api()` in-template. |

## Implementation Plan
1. Add missing dialog root inputs, models, outputs, and public detail/event types.
2. Add trigger `value` input and pass it to Zag trigger props.
3. Expand Angular Storybook examples and shared demo styles to match React coverage where component-local.
4. Add specs for the new API and examples.
5. Run component tests, typecheck as feasible, `git diff --check`, then commit only dialog-related files and this audit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked before completion by unrelated existing `src/collapsible/collapsible.spec.ts(79,73): error TS4111: Property 'id' comes from an index signature, so it must be accessed with ['id'].`
- [x] Component tests: `bun run --cwd packages/angular test:ci src/dialog/dialog.spec.ts` passed, 33 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started successfully and reported Storybook ready at `http://localhost:6006/`; stopped after readiness.
- [x] Manual/visual checks: Compared React `dialog.module.css` selectors and stories against Angular examples/styles; browser visual inspection was not performed.
- [x] Diff hygiene: `git diff --check` passed.

## Commit
- Hash:
- Message: `fix(angular): align dialog with react parity`
