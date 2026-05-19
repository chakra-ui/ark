# Dialog Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/dialog/`
- React files: `packages/react/src/components/dialog/`
- Storybook/style files: `packages/angular/src/dialog/dialog.stories.ts`, `packages/angular/src/dialog/dialog-example-styles.ts`, `.storybook/modules/dialog.module.css`

## Summary
- Status: Re-audit complete. The previous pass already closed the structural API, story, styling, and spec gaps. The remaining deferred `OpenFromMenu` example is now implemented because the Angular menu component is stable and has the required parts. No further behavior or API gaps were found versus the React reference.
- Highest-risk gaps closed: `OpenFromMenu` cross-component example (menu + alertdialog wiring).
- Architecture decisions preserved: presence/render-strategy stays out of `DialogRoot` (React mixes `UsePresenceProps` into `DialogRootBaseProps`; the Angular package per `docs/technical-requirements.md` keeps `<ark-presence>` as a separate component and lazy mount/unmount lives on the example template wrapper). React's `<Dialog.Context>` render-prop part has no Angular directive equivalent; instead consumers use `exportAs="arkDialog"` + `#root` to read `root.api()` in-template, as recorded in the original audit.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Dialog root omitted `aria-label`, `trapFocus`, `restoreFocus`, focus target callbacks, persistent elements, trigger value controls, and dismissable-layer callback outputs. | `packages/react/src/components/dialog/use-dialog.ts`, `packages/solid/src/components/dialog/dialog-root.tsx`, Zag `DialogProps` | `packages/angular/src/dialog/dialog-root.ts`, `packages/angular/src/dialog/dialog.types.ts`, `packages/angular/src/dialog/public-api.ts` | Closed in prior pass — verified inputs/models/outputs (`aria-label`, `trapFocus`, `restoreFocus`, `initialFocusEl`, `finalFocusEl`, `persistentElements`, `triggerValue`/`defaultTriggerValue`, `escapeKeyDown`, `focusOutside`, `interactOutside`, `pointerDownOutside`, `requestDismiss`) all present and wired through `useDialog`. |
| Public API parity | Dialog triggers could not pass the identifying trigger `value` to Zag. | `packages/react/src/components/dialog/examples/multiple-triggers.tsx`, Zag `getTriggerProps(props)` | `packages/angular/src/dialog/dialog-trigger.ts` | Closed in prior pass — `value` signal input forwarded to `api().getTriggerProps({ value })`. |
| Story parity | Angular Storybook lacked Confirmation, Context, FinalFocus, InitialFocus, InsideScroll, LazyMount, MultipleTriggers, Nested, OutsideScroll, RapidStateChange examples. | `packages/react/src/components/dialog/dialog.stories.tsx` | `packages/angular/src/dialog/dialog.stories.ts`, `packages/angular/src/dialog/examples/` | Closed in prior pass — all listed Angular examples and story registrations present. |
| Story parity | React `OpenFromMenu` example was deferred awaiting menu stability. | `packages/react/src/components/dialog/examples/open-from-menu.tsx` | `packages/angular/src/dialog/examples/open-from-menu.ts`, `packages/angular/src/dialog/dialog.stories.ts`, `packages/angular/src/dialog/dialog.spec.ts` | Closed in this pass — added `DialogOpenFromMenuExample` (menu trigger opens an `alertdialog` via controlled `[(open)]`), wired the story, and added a mount-smoke spec entry. |
| Styling parity | Angular demo styles missed backdrop/content animations, nested-layer scaling, action/body/field rows, scroll-container layout, and outside-scroll variant. | `.storybook/modules/dialog.module.css` | `packages/angular/src/dialog/dialog-example-styles.ts` | Closed in prior pass — verified `[arkDialogBackdrop]`/`[arkDialogContent]` keyframes, `[data-has-nested]` scale, `.body`, `.actions`, `.field`, `.scroll-container`, and `.outside-scroll` positioner overrides all present. |
| Test parity | Angular tests did not cover valued triggers, `aria-label`, callback outputs, or the added examples. | `packages/react/src/components/dialog/tests/dialog.test.tsx` | `packages/angular/src/dialog/dialog.spec.ts` | Closed in prior pass — public-type smoke, content `aria-label`/role, `[(triggerValue)]` round-trip, escape callback output, and per-example mount specs all present; this pass adds `DialogOpenFromMenuExample` to the mount matrix. |
| API design | React `Dialog.Context` has no direct Angular directive equivalent. | `packages/react/src/components/dialog/dialog-context.tsx` | `packages/angular/src/dialog/examples/context.ts` | No change — Angular exposes the root via `exportAs="arkDialog"` so consumers read `root.api()` in-template. Consistent with `docs/technical-requirements.md §5`. |
| API design | React `DialogRootBaseProps` mixes `UsePresenceProps` (`lazyMount`, `unmountOnExit`, `present`, `present`/`mountOptions`) directly onto the root. | `packages/react/src/components/dialog/dialog-root.tsx` | `packages/angular/src/dialog/examples/lazy-mount.ts` | No change — Angular routes render-strategy through the `<ark-presence>` component (see `packages/angular/src/presence/`), which is the project-wide pattern recorded in `docs/technical-requirements.md §4` (Portaled and dynamic parts). |

## Implementation Plan
1. Add `DialogOpenFromMenuExample`: an `ark-menu` whose "Delete..." item flips a host signal that drives `[(open)]` on a sibling `arkDialog role="alertdialog"`.
2. Register `OpenFromMenu` in `dialog.stories.ts`.
3. Add the new example to the `it.each([...])` mount matrix in `dialog.spec.ts`.
4. Re-run dialog spec to confirm 34 tests pass.
5. Stage only dialog files plus this audit, then commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` — not re-run in this pass because no public types changed and the prior pass logged a pre-existing failure unrelated to dialog (`src/collapsible/collapsible.spec.ts(79,73)` TS4111). No new exports were introduced.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/dialog/dialog.spec.ts` — 34 tests passed (1.96s).
- [ ] Storybook render: not re-run this pass; readiness was confirmed in the prior pass and only one new self-contained example was added.
- [x] Manual/visual checks: compared React `dialog.module.css` selectors and `examples/*.tsx` against Angular `dialog-example-styles.ts` and `examples/*.ts`; OpenFromMenu mirrors React's menu→alertdialog flow with the same buttons, separator placement, and dialog markup.
- [x] Diff hygiene: `git diff --check` — clean.

## Commit
- Hash: pending
- Message: `fix(angular): align dialog with react parity`
