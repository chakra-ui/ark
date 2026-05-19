# Popover Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/popover/` (root, root-provider, trigger, anchor, positioner, content, title, description, close-trigger, indicator, arrow, arrow-tip, use-popover, use-popover-context, popover.types, popover.anatomy, examples/, popover-example-styles.ts, popover.stories.ts, popover.spec.ts)
- React files: `packages/react/src/components/popover/` (root, root-provider, trigger, anchor, positioner, content, title, description, close-trigger, indicator, arrow, arrow-tip, context, use-popover, use-popover-context, popover.anatomy, examples/, popover.stories.tsx)
- Storybook/style files: `.storybook/modules/popover.module.css`, `packages/angular/src/popover/popover-example-styles.ts`

## Summary
- Status: Re-audited; previously-recorded parity gaps remain closed. New pass tightened Storybook style parity against `.storybook/modules/popover.module.css` (close-trigger color/offset, title color, indicator svg sizing).
- Highest-risk gaps: Public API of Angular `ArkPopoverRoot` does not surface React's `UsePresenceProps` (`lazyMount`, `unmountOnExit`, `present`, `immediate`, `onExitComplete`); Angular convention is to wire `<ark-presence>` in the consumer template, consistent with Dialog/Tooltip/HoverCard/Menu/Select roots. This is a project-wide directive-centric decision documented in `docs/technical-requirements.md`, not a popover-specific bug.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root `persistentElements`, `translations`, dismissal outputs, controlled `triggerValue`/`defaultTriggerValue`. | `packages/react/src/components/popover/use-popover.ts` | `packages/angular/src/popover/popover-root.ts` | Already addressed in previous audit pass; re-verified inputs, outputs, type exports forward to Zag. |
| Public API | `ArkPopoverTrigger` `value` input for multi-trigger flows. | `packages/react/src/components/popover/popover-trigger.tsx` | `packages/angular/src/popover/popover-trigger.ts` | Already addressed; verified `getTriggerProps({ value })` flow. |
| Public API | React Root extends `UsePresenceProps` (`lazyMount`, `unmountOnExit`, `present`, `immediate`, `onExitComplete`); Angular Root requires consumer to wire `<ark-presence>` in template. | `packages/react/src/components/popover/popover-root.tsx` | `packages/angular/src/popover/popover-root.ts` | No change. Matches Dialog/Tooltip/HoverCard/Menu directive-centric pattern. Examples (`lazy-mount`, `nested`) already demonstrate the `<ark-presence>` wiring. Collapsible's `isUnmounted` pattern is reserved for non-portaled presence components. |
| Stories | Direct examples for close behavior, context, disable outside click, initial focus, lazy mount, multiple triggers, nested, positioning, same width, default open. | `packages/react/src/components/popover/popover.stories.tsx` | `packages/angular/src/popover/popover.stories.ts`, `examples/` | Already addressed; re-verified all stories registered. |
| Stories | `AsChild`, `Factory`. | `packages/react/src/components/popover/examples/as-child.tsx`, `factory.tsx` | Angular popover examples | No change. Angular directive-centric API replaces React's polymorphic factory/`asChild`. |
| Stories | `WithDialog`. | `packages/react/src/components/popover/examples/with-dialog.tsx` | Angular popover examples | Deferred as cross-component integration with Dialog. `Nested` already covers layered popover dismissal. |
| Styling | Close trigger drifted from React: Angular used `top/right: 0.5rem`, added a hover background, and used `color: inherit` + `border-radius`. React uses `top/right: 4px`, no hover swap, `color: var(--demo-neutral-emphasized)`, no border-radius. | `.storybook/modules/popover.module.css` `.CloseTrigger` | `popover-example-styles.ts` `[arkPopoverCloseTrigger]` | Updated Angular selector to match React: `top/right: 4px`, drop hover background and border-radius, use `--demo-neutral-emphasized`. |
| Styling | Title color was inherited; React explicitly sets `var(--demo-neutral-fg)`. | `.storybook/modules/popover.module.css` `.Title` | `popover-example-styles.ts` `[arkPopoverTitle]` | Added `color: var(--demo-neutral-fg, #1c1917)` to `[arkPopoverTitle]`. |
| Styling | Indicator svg sizing missing; React `.Indicator > svg` is `1rem`. | `.storybook/modules/popover.module.css` `.Indicator > svg` | `popover-example-styles.ts` `[arkPopoverIndicator]` | Added `[arkPopoverIndicator] svg { width: 1rem; height: 1rem; }`. |
| Styling | `[arkPopoverCloseTrigger].button` and `data-variant='solid'` overrides exist in Angular helper but no example consumes them. React has no equivalent. | n/a | `popover-example-styles.ts` | No change. Harmless dead style; removing risks breaking unseen consumers and outside this audit's scope. |
| Functionality | Trigger `aria-controls` gating on presence unmount. React strips `aria-controls` when presence is unmounted. | `popover-trigger.tsx` | `packages/angular/src/popover/popover-trigger.ts` | No change. Angular content directive lives outside `<ark-presence>` and is mounted regardless; Zag-provided `aria-controls` always references the content id, matching the directive-centric layout. Documented as design difference. |
| Accessibility | Roles, labels, ARIA props are produced by Zag's `connect()` for both adapters and applied via `applyArkProps`. Verified via `popover.spec.ts` for trigger, close trigger, indicator, arrow, arrow-tip data-scope/data-part. | shared | shared | No change required. |
| Tests | Spec covers trigger value forwarding, controlled open round-trip, defaultOpen attribute, portal injector, controlled-no-resend, examples mount-smoke (21 tests). | `packages/react/src/components/popover/tests/` | `packages/angular/src/popover/popover.spec.ts` | No new behavior to cover this pass. |

## Implementation Plan
1. Audit existing parity remediations; confirm previous fixes (inputs/outputs, `value` on trigger, examples, stories) remain intact.
2. Apply Storybook style drift fixes against `.storybook/modules/popover.module.css`:
   - Reset `[arkPopoverCloseTrigger]` offset to `4px`, drop hover background and `border-radius`, switch color to `--demo-neutral-emphasized`.
   - Add explicit `color: var(--demo-neutral-fg)` to `[arkPopoverTitle]`.
   - Add `[arkPopoverIndicator] svg { width: 1rem; height: 1rem; }`.
3. Re-run popover spec under Vitest.
4. Record the verification result and commit hash; commit `fix(angular): align popover with react parity`.

## Verification
- [x] Typecheck/build: Skipped full `bun run --cwd packages/angular typecheck` in this pass because changes are limited to Storybook example styles (a `const` string) and audit doc. Library types unchanged. Prior re-audit recorded an unrelated `pin-input` TS4111 block at `packages/angular/pin-input/pin-input-input.ts:56`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/popover/popover.spec.ts` — 21 tests passed.
- [ ] Storybook render: Not re-run in this pass; previous pass recorded successful compile after seeding `.angular/cache`. Style-only diffs do not affect compile graph.
- [x] Manual/visual checks: Diffed `.storybook/modules/popover.module.css` vs `popover-example-styles.ts` after edits; close-trigger offsets/color, title color, and indicator svg sizing now match React baselines. No browser screenshot captured.

## Commit
- Hash: recorded in final status
- Message: `fix(angular): align popover with react parity`
