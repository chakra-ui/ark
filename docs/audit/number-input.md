# Number Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/number-input/number-input-root.ts`, `packages/angular/number-input/use-number-input.ts`, `packages/angular/number-input/number-input.spec.ts`, `packages/angular/number-input/number-input.stories.ts`, `packages/angular/number-input/examples/`, `packages/angular/number-input/number-input-example-styles.ts`
- React files: `packages/react/src/components/number-input/number-input-root.tsx`, `packages/react/src/components/number-input/use-number-input.ts`, `packages/react/src/components/number-input/examples/`, `packages/react/src/components/number-input/tests/number-input.test.tsx`
- Storybook/style files: `packages/react/src/components/number-input/number-input.stories.tsx`, `.storybook/modules/number-input.module.css`, `packages/angular/number-input/number-input.stories.ts`

## Summary
- Status: Fixed and verified with focused component tests plus Storybook smoke startup.
- Highest-risk gaps: Package-wide typecheck is currently blocked by unrelated listbox and navigation-menu errors outside this component.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root accepts `locale` through React props but Angular root has no locale input. | `packages/react/src/components/number-input/number-input-root.tsx` | `packages/angular/number-input/number-input-root.ts` | Fixed: added `locale` input and preserved provider fallback in `useNumberInput`. |
| Public API | `onFocusChange`, `onValueCommit`, and `onValueInvalid` have no Angular outputs. | `packages/react/src/components/number-input/number-input-root.tsx` | `packages/angular/number-input/number-input-root.ts` | Fixed: added `(focusChange)`, `(valueCommit)`, and `(valueInvalid)` outputs. |
| Stories | Formatting, FractionDigits, MouseWheel, Context, and Scrubber stories are missing. | `packages/react/src/components/number-input/number-input.stories.tsx` | `packages/angular/number-input/number-input.stories.ts` | Fixed: added matching Angular examples and story exports. |
| Styling | Angular example CSS uses inline-flex bordered control instead of React's positioned control, overlaid trigger group, invalid/focus/disabled states, and scrubber padding. | `.storybook/modules/number-input.module.css` | `packages/angular/number-input/number-input-example-styles.ts` | Fixed: aligned selectors and added trigger group/scrubber state styling. |
| Tests | Angular does not cover fraction formatting or callback output parity. | `packages/react/src/components/number-input/tests/number-input.test.tsx` | `packages/angular/number-input/number-input.spec.ts` | Fixed: added focused specs for output and formatting behavior. |

## Implementation Plan
1. Add the missing root input/output channels and verify they emit Zag detail objects.
2. Add missing Storybook examples and wire them into the Angular stories file.
3. Align example styles with the React CSS module using Angular selectors and small local icon components.
4. Add targeted Angular specs for the newly covered parity behavior.
5. Run focused tests, typecheck, and diff checks; record results before committing.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; failed on unrelated `listbox/listbox.spec.ts` and `src/navigation-menu/navigation-menu.spec.ts` TypeScript errors outside `number-input`.
- [x] Component tests: `bun run --cwd packages/angular test:ci number-input/number-input.spec.ts` passed, 16 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook --ci --smoke-test --quiet` passed.
- [x] Manual/visual checks: Compared React `number-input.module.css` and story list against Angular examples; Angular stories now cover Basic, Controlled, Formatting, FractionDigits, MinMax, MouseWheel, Context, WithField, RootProvider, and Scrubber.
- [x] Diff check: `git diff --check` passed.

## Commit
- Hash:
- Message: fix(angular): align number-input with react parity
