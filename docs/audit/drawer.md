# Drawer Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/drawer/`
- React files: `packages/react/src/components/drawer/`
- Storybook/style files: `packages/angular/src/drawer/drawer.stories.ts`, `packages/angular/src/drawer/examples/`, `packages/angular/src/drawer/drawer-example-styles.ts`, `.storybook/modules/drawer.module.css`

## Summary
- Status: Re-audited. Closed two remaining functional parity gaps on top of the prior pass.
- Highest-risk gaps (prior pass): part directives missed React part props; Angular Storybook covered fewer drawer states.
- Highest-risk gaps (this pass):
  1. `useDrawer`/`ArkDrawerRoot` did not auto-consume an ancestor `<ark-drawer-stack>`, so stacked indent visuals did not work unless the consumer manually forwarded `[stack]`. React's `useDrawer` resolves the stack from context automatically.
  2. The `multiple-triggers` Angular example treated `(triggerValueChange)` as if it emitted a `DrawerTriggerValueChangeDetails` object, but Angular `model()` outputs emit the bare value. The handler dereferenced `details.value` and never resolved a user, leaving the form blank after every trigger click.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity (prior pass) | Trigger did not accept the optional `value` part prop. | `packages/react/src/components/drawer/drawer-trigger.tsx` | `packages/angular/src/drawer/drawer-trigger.ts` | Added optional `value` input forwarded to `api().getTriggerProps`. |
| Public API parity (prior pass) | Content did not expose the `draggable` part prop. | `packages/react/src/components/drawer/drawer-content.tsx` | `packages/angular/src/drawer/drawer-content.ts` | Added boolean `draggable` input (default `true`) forwarded to `api().getContentProps`. |
| Public API parity (prior pass) | Swipe area did not expose `disabled` or `swipeDirection` props. | `packages/react/src/components/drawer/drawer-swipe-area.tsx`, `@zag-js/drawer` `SwipeAreaProps` | `packages/angular/src/drawer/drawer-swipe-area.ts` | Added `disabled` and `swipeDirection` inputs forwarded to `api().getSwipeAreaProps`. |
| Story parity (prior pass) | Angular Storybook missed React's `SnapPoints`, `Modal`, `MultipleTriggers`, `Scrollable`, `NoDragArea`, `NonDraggable`, `IndentBackground` examples. | `packages/react/src/components/drawer/drawer.stories.tsx`, `packages/react/src/components/drawer/examples/` | `packages/angular/src/drawer/drawer.stories.ts`, `packages/angular/src/drawer/examples/` | Added matching Angular examples and story exports; kept Angular-only `DefaultOpen` and `WithTitleDescription` as supplemental. |
| Styling parity (prior pass) | Angular example styles lacked CSS states for swipe directions, animations, scrollable content, stack indent visuals, trigger/close hover/focus. | `.storybook/modules/drawer.module.css` | `packages/angular/src/drawer/drawer-example-styles.ts` | Mirrored selectors using Angular directive attribute selectors and local helper classes. |
| Functionality parity (this pass) | `useDrawer`/`ArkDrawerRoot` did not auto-consume the ancestor `<ark-drawer-stack>` stack store; React's `useDrawer` calls `useDrawerStackStore()` and merges it into the machine context. | `packages/react/src/components/drawer/use-drawer.ts` | `packages/angular/src/drawer/use-drawer.ts` | Injected `ARK_DRAWER_STACK_CONTEXT` optionally in `useDrawer` and merged its `stack` into the Zag context when no explicit `stack` prop is provided. The existing `[stack]` input still wins. |
| Story/example parity (this pass) | `DrawerMultipleTriggersExample` treated `(triggerValueChange)` as emitting a `DrawerTriggerValueChangeDetails` object, but Angular `model()`-derived outputs emit the bare value. Active user resolution never succeeded. | `packages/react/src/components/drawer/examples/multiple-triggers.tsx` (uses `onTriggerValueChange={(e) => ... e.value}` — React passes the details object) | `packages/angular/src/drawer/examples/multiple-triggers.ts` | Renamed handler to `onTriggerValueChange` and typed the argument as `string \| null \| undefined`. Dropped the unused `DrawerTriggerValueChangeDetails` import. |
| Presence/unmount parity | React `DrawerContent` and `DrawerPositioner` early-return `null` when `presence.unmounted` is true and `DrawerBackdrop` wraps `usePresence`; Angular leaves render-strategy/presence to the consumer via `@if` or `arkPresence`. | `packages/react/src/components/drawer/drawer-content.tsx`, `drawer-positioner.tsx`, `drawer-backdrop.tsx` | `packages/angular/src/drawer/drawer-content.ts`, `drawer-positioner.ts`, `drawer-backdrop.ts` | No change. Per `docs/technical-requirements.md`, Angular uses block control flow (`@if`) and the existing `arkPresence` directive rather than auto-unmounting via the directive itself. |
| Test parity (this pass) | Specs did not cover the auto-stack flow or the `(triggerValueChange)` emission contract. | New | `packages/angular/src/drawer/drawer.spec.ts` | Added `(triggerValueChange) emits the raw value` and `[arkDrawer] inside <ark-drawer-stack> auto-consumes the ancestor stack context`. |

## Implementation Plan
1. Auto-consume the ancestor `ARK_DRAWER_STACK_CONTEXT` in `useDrawer` (and therefore in both `ArkDrawerRoot` and `ArkDrawerRootProvider` via the underlying hook).
2. Fix `DrawerMultipleTriggersExample` to use the bare value emitted by `(triggerValueChange)` from `model()`.
3. Add specs covering the auto-stack flow and the trigger-value emission contract.
4. Verify with the focused drawer spec run, then `typecheck`, then `git diff --check`.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/drawer/drawer.spec.ts` -> 26 passed.
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` -> Built Angular Package; forms isolation: ok.
- [ ] Storybook render: Not re-run this pass. The prior pass started Storybook on port 6007; no story/template changes in this pass affect render-time behavior beyond the multiple-triggers handler rename, which the spec covers.
- [ ] Manual/visual checks: Not completed in a browser; the auto-stack change only takes effect inside `<ark-drawer-stack>` and is covered by spec.
- [x] Diff check: `git diff --check -- packages/angular/src/drawer docs/audit/drawer.md` passed.

## Commit
- Hash: `99a719264`
- Message: `fix(angular): align drawer with react parity`
