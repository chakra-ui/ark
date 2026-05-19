# Tooltip Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tooltip/`
- React files: `packages/react/src/components/tooltip/`
- Storybook/style files: `packages/angular/src/tooltip/tooltip.stories.ts`, `packages/angular/src/tooltip/examples/`, `packages/angular/src/tooltip/tooltip-example-styles.ts`, `.storybook/modules/tooltip.module.css`

## Summary
- Status: Re-audited. Prior round fixed trigger `value`, added the `Context`, `MultipleTriggers`, and `WithinFixed` stories, and broadened example styles. This pass narrows the remaining `.ToolbarButton` style drift and re-confirms presence parity remains the only outstanding deferred gap.
- Highest-risk gaps:
  - Root-level presence props (`lazyMount`, `unmountOnExit`, `present`) are still not surfaced on Angular `arkTooltip` / `arkTooltipRootProvider`. Consumers must wrap `<div arkTooltipContent>` with `ark-presence` manually.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Trigger part lacks the `value` input passed to `getTriggerProps`. | `packages/react/src/components/tooltip/tooltip-trigger.tsx` | `packages/angular/src/tooltip/tooltip-trigger.ts` | Already fixed: `value` signal input forwarded to `context.api().getTriggerProps({ value })`. |
| Story parity | Missing `Context` story. Angular renders the same idea using `#root="arkTooltip"` exportAs instead of a render-prop `Tooltip.Context` component. | `packages/react/src/components/tooltip/examples/context.tsx` | `packages/angular/src/tooltip/tooltip.stories.ts` | Already fixed: `TooltipContextExample` and `Context` story shipped. |
| Story parity | Missing `MultipleTriggers` story. | `packages/react/src/components/tooltip/examples/multiple-triggers.tsx` | `packages/angular/src/tooltip/tooltip.stories.ts` | Already fixed: `TooltipMultipleTriggersExample` and `MultipleTriggers` story shipped with `[(triggerValue)]` and per-trigger `[value]`. |
| Story parity | Missing `WithinFixed` story. | `packages/react/src/components/tooltip/examples/within-fixed.tsx` | `packages/angular/src/tooltip/tooltip.stories.ts` | Already fixed: `TooltipWithinFixedExample` and `WithinFixed` story shipped, with a `.FixedContainer` class for the fixed-position parent. |
| Story parity | Angular adds an `Interactive` story (`[interactive]="true"`) with no matching React example. | n/a | `packages/angular/src/tooltip/examples/interactive.ts` | No change. Angular-specific coverage for `interactive` is useful and does not violate React parity; React parity does not require deleting Angular-only educational examples. |
| Styling parity | `.ToolbarButton` lacked `display: inline-flex`, alignment, `border-radius`, `color`, `transition`, and svg sizing. | `.storybook/modules/tooltip.module.css` (`.ToolbarButton`) | `packages/angular/src/tooltip/tooltip-example-styles.ts` | Fixed: aligned `.ToolbarButton` block to React module, including `svg` size rule. |
| Styling parity | Positioner z-index lives on the positioner in Angular vs the content in React. | `.storybook/modules/tooltip.module.css` (`.Content`) | `packages/angular/src/tooltip/tooltip-example-styles.ts` (`[arkTooltipPositioner]`) | No change. Placing z-index on the positioner is the correct Angular behavior since portal mounts the positioner; the content still inherits stacking context. |
| Test parity | No Angular coverage for trigger `value`/`triggerValue` behavior or new story examples. | `packages/react/src/components/tooltip/tests/tooltip.test.tsx` plus `examples/multiple-triggers.tsx` | `packages/angular/src/tooltip/tooltip.spec.ts` | Already fixed: specs for trigger `value` forwarding, basic/controlled/delay/context/multiple-triggers/within-fixed mount, and a11y / open-close behavior. |
| Test parity | React tests cover `lazyMount` and `unmountOnExit`; Angular has no equivalent coverage. | `packages/react/src/components/tooltip/tests/tooltip.test.tsx` | `packages/angular/src/tooltip/tooltip.spec.ts` | Deferred. Tied to the presence-parity gap below — once the Angular root surfaces presence props, specs should mirror the React `lazyMount`/`unmountOnExit` cases. |
| Presence parity | React `Root` / `RootProvider` accept presence props (`lazyMount`, `unmountOnExit`, `present`); Angular tooltip does not currently compose `ark-presence` at the root, so those props are not surfaced. | `packages/react/src/components/tooltip/tooltip-root.tsx`, `tooltip-root-provider.tsx` | `packages/angular/src/tooltip/tooltip-root.ts`, `tooltip-root-provider.ts` | Deferred. Implementing root-level presence requires a broader cross-overlay Angular API decision (presence context propagation across portals shared with Dialog/Popover/HoverCard/Menu). Consumers can wrap content with `ark-presence` manually in the interim. |

## Implementation Plan
1. Re-confirm trigger `value`, stories (`Context`, `MultipleTriggers`, `WithinFixed`), and specs from the prior pass.
2. Tighten `.ToolbarButton` styles in `tooltip-example-styles.ts` to mirror the React CSS module exactly.
3. Run the tooltip spec to verify no regressions.
4. Leave root-level presence parity deferred with rationale.

## Verification
- [x] Typecheck/build: Not re-run this pass — no public API or exports changed; only a CSS string in `tooltip-example-styles.ts` was edited. Prior pass had: `bun run --cwd packages/angular typecheck` passed (ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `bun run build`, and `bun run scripts/check-forms-isolation.ts`).
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tooltip/tooltip.spec.ts` passed (1 file, 25 tests, ~1.93s).
- [x] Storybook render: From prior pass — `bun run --cwd packages/angular storybook -- --port 6007 --ci` compiled and reported Storybook ready (port fallback chain landed on `http://localhost:6008/`). Not re-run because only inline example styles changed.
- [ ] Manual/visual checks: Not completed in a browser. Storybook compilation covered the added stories; visual inspection remains deferred.

## Commit
- Hash: To be filled after commit.
- Message: `fix(angular): align tooltip with react parity`
