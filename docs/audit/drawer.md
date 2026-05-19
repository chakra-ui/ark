# Drawer Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/drawer/`
- React files: `packages/react/src/components/drawer/`
- Storybook/style files: `packages/angular/src/drawer/drawer.stories.ts`, `packages/angular/src/drawer/examples/`, `packages/angular/src/drawer/drawer-example-styles.ts`, `.storybook/modules/drawer.module.css`

## Summary
- Status: Fixed Angular drawer parity gaps found in this pass.
- Highest-risk gaps: Angular part directives missed several React part props, and Angular Storybook covered fewer drawer states than React.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Trigger did not accept the optional `value` part prop, preventing multiple-trigger demos from setting the active trigger value. | `packages/react/src/components/drawer/drawer-trigger.tsx` | `packages/angular/src/drawer/drawer-trigger.ts` | Add optional `value` input and pass it to `api().getTriggerProps`. |
| Public API parity | Content did not expose the `draggable` part prop, so consumers could not match the React non-draggable content demo. | `packages/react/src/components/drawer/drawer-content.tsx` | `packages/angular/src/drawer/drawer-content.ts` | Add boolean `draggable` input defaulting to `true` and pass it to `api().getContentProps`. |
| Public API parity | Swipe area did not expose `disabled` or `swipeDirection` props. | `packages/react/src/components/drawer/drawer-swipe-area.tsx`, `@zag-js/drawer` `SwipeAreaProps` | `packages/angular/src/drawer/drawer-swipe-area.ts` | Add `disabled` and `swipeDirection` inputs and pass them to `api().getSwipeAreaProps`. |
| Story parity | Angular Storybook was missing React's `SnapPoints`, `Modal`, `MultipleTriggers`, `Scrollable`, `NoDragArea`, `NonDraggable`, and `IndentBackground` examples. | `packages/react/src/components/drawer/drawer.stories.tsx`, `packages/react/src/components/drawer/examples/` | `packages/angular/src/drawer/drawer.stories.ts`, `packages/angular/src/drawer/examples/` | Add matching Angular examples and story exports. Keep existing Angular-only `DefaultOpen` and `WithTitleDescription` stories as supplemental coverage. |
| Styling parity | Angular example styles lacked React drawer CSS states for swipe directions, animations, scrollable content, stack indent visuals, and trigger/close hover/focus states. | `.storybook/modules/drawer.module.css` | `packages/angular/src/drawer/drawer-example-styles.ts` | Expand Angular example styles to mirror React selectors using Angular directive selectors and local helper classes. |
| Test parity | Specs did not cover the missing part props or newly added parity examples. | React examples and Zag part prop types | `packages/angular/src/drawer/drawer.spec.ts` | Add focused specs for trigger values, content draggable, swipe area props, and example mounting/state checks. |

## Implementation Plan
1. Add missing part directive inputs for trigger, content, and swipe area.
2. Add Angular examples and story exports matching the React drawer Storybook set.
3. Align drawer example styles with the React CSS module states and helper classes.
4. Add focused Angular tests for the public API and examples.
5. Run component tests, typecheck, and diff checks; record results.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by unrelated dirty `src/collapsible/collapsible.spec.ts(79,73)` TS4111 (`id` must be accessed with `['id']`).
- [x] Component tests: `bun run --cwd packages/angular test:ci src/drawer/drawer.spec.ts` passed, 24 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007` reached "Storybook ready" at `http://localhost:6007/`; stopped with Ctrl-C after startup. Default `6006` was already in use.
- [ ] Manual/visual checks: Not completed in a browser; styles were aligned by source comparison against `.storybook/modules/drawer.module.css`.
- [x] Diff check: `git diff --check -- packages/angular/src/drawer docs/audit/drawer.md` passed.

## Commit
- Hash: `be478e09d`
- Message: `fix(angular): align drawer with react parity`
