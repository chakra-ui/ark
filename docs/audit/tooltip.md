# Tooltip Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tooltip/`
- React files: `packages/react/src/components/tooltip/`
- Storybook/style files: `packages/angular/src/tooltip/tooltip.stories.ts`, `packages/angular/src/tooltip/examples/`, `packages/angular/src/tooltip/tooltip-example-styles.ts`, `.storybook/modules/tooltip.module.css`

## Summary
- Status: Fixed trigger/story/style/test gaps; presence parity is deferred.
- Highest-risk gaps:
  - `[arkTooltipTrigger]` does not accept the React trigger `value` prop, so trigger-value updates and multiple-trigger tooltips cannot be represented.
  - Angular Storybook is missing React parity stories for `Context`, `MultipleTriggers`, and `WithinFixed`.
  - Angular demo styles are thinner than the React module styles for trigger/content disabled, hover, arrow-tip, toolbar, shortcut, and open/closed animation states.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Trigger part lacks the `value` input passed to `getTriggerProps`. | `packages/react/src/components/tooltip/tooltip-trigger.tsx` | `packages/angular/src/tooltip/tooltip-trigger.ts` | Add a signal `value` input and pass it to `context.api().getTriggerProps({ value })`. |
| Story parity | Missing `Context` story. Angular does not need a separate render-prop directive because `exportAs` exposes `api()` in templates. | `packages/react/src/components/tooltip/examples/context.tsx` | `packages/angular/src/tooltip/tooltip.stories.ts` | Add `TooltipContextExample` using `#root="arkTooltip"` and `root.api().open`. |
| Story parity | Missing `MultipleTriggers` story. | `packages/react/src/components/tooltip/examples/multiple-triggers.tsx` | `packages/angular/src/tooltip/tooltip.stories.ts` | Add `TooltipMultipleTriggersExample` using trigger `value` inputs and `[(triggerValue)]`. |
| Story parity | Missing `WithinFixed` story. | `packages/react/src/components/tooltip/examples/within-fixed.tsx` | `packages/angular/src/tooltip/tooltip.stories.ts` | Add `TooltipWithinFixedExample` with `positioning.strategy = 'fixed'`. |
| Styling parity | Angular example CSS lacks several React module selectors/states. | `.storybook/modules/tooltip.module.css` | `packages/angular/src/tooltip/tooltip-example-styles.ts` | Align trigger/content/arrow/toolbar/shortcut styles and animations using Angular selectors/classes. |
| Test parity | No Angular coverage for trigger `value`/`triggerValue` behavior or new story examples. | `packages/react/src/components/tooltip/tests/tooltip.test.tsx` and `examples/multiple-triggers.tsx` | `packages/angular/src/tooltip/tooltip.spec.ts` | Add specs for trigger values and story mounting. |
| Presence parity | React `Root`/`RootProvider` accept presence props such as `lazyMount`/`unmountOnExit`; Angular tooltip does not currently compose `ark-presence` at the root. | `packages/react/src/components/tooltip/tooltip-root.tsx`, `tooltip-root-provider.tsx` | `packages/angular/src/tooltip/tooltip-root.ts`, `tooltip-root-provider.ts` | Deferred: implementing root-level presence would require a broader cross-overlay Angular API decision. Consumers can wrap content with `ark-presence` manually. |

## Implementation Plan
1. Add `value` to `ArkTooltipTrigger` and pass it through to Zag.
2. Add missing Angular examples and story exports for `Context`, `MultipleTriggers`, and `WithinFixed`.
3. Bring tooltip example styles closer to the React CSS module.
4. Add focused specs for trigger `value` behavior and the new examples.
5. Run tooltip specs, typecheck, and diff checks.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `bun run build`, and `bun run scripts/check-forms-isolation.ts`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tooltip/tooltip.spec.ts` passed with 1 file and 25 tests. The repo-root path form, `bun run --cwd packages/angular test:ci packages/angular/src/tooltip/tooltip.spec.ts`, was attempted first and failed because the package-local Vitest filter found no matching file.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007 --ci` compiled and reported Storybook ready at `http://localhost:6008/` because ports 6006 and 6007 were occupied.
- [ ] Manual/visual checks: Not completed in a browser. Storybook compilation covered the added stories; visual inspection remains deferred.

## Commit
- Hash: Pending until commit.
- Message: `fix(angular): align tooltip with react parity`
