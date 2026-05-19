# Timer Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/timer/`
- React files: `packages/react/src/components/timer/`
- Storybook/style files: `packages/angular/src/timer/timer.stories.ts`, `packages/angular/src/timer/timer-example-styles.ts`, `.storybook/modules/timer.module.css`

## Summary
- Status: Fixed Angular Storybook style parity for timer display layout and story ordering.
- Highest-risk gaps: Angular's machine wiring and public directives already match React's root/action/area/control/item/separator/root-provider surface. The remaining user-visible drift was Storybook styling: Angular rendered boxed timer digits, while React renders compact unframed tabular digits.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Styling parity | Timer item groups and digits used grid layout, fixed 44px boxes, borders, white backgrounds, and 20px type; React uses unframed flex columns, `2ch` minimum width, centered text, and `1.5rem` tabular digits. | `.storybook/modules/timer.module.css` | `packages/angular/src/timer/timer-example-styles.ts` | Updated Angular timer example styles to match the React timer module layout and typography. |
| Story parity | Angular exported `Events` before `Interval`; React orders `Interval` before `Events`. | `packages/react/src/components/timer/timer.stories.tsx` | `packages/angular/src/timer/timer.stories.ts` | Reordered Angular story exports to match React's story list. |
| Public API | `Timer.ItemLabel` and `Timer.ItemValue` helpers are available on Zag's machine API but not exposed as React components. | `packages/react/src/components/timer/timer.ts`, `@zag-js/timer` API | `packages/angular/src/timer/public-api.ts` | No change; Angular matches React's public component/directive surface by exposing `ArkTimerItem` only. |
| Functionality | Angular root uses an effect to start when `autoStart` input becomes true instead of passing `autoStart` as initial machine context from the directive constructor. | `packages/react/src/components/timer/timer-root.tsx` | `packages/angular/src/timer/timer-root.ts` | No change; Angular signal inputs are not populated early enough for constructor-time initial machine state, and existing tests cover `autoStart` count-up, countdown, and cleanup behavior. |

## Implementation Plan
1. Document the React and Angular timer source, story, style, API, and test comparison.
2. Align Angular timer Storybook styles with the React timer CSS module.
3. Reorder Angular timer stories to match React's exported story sequence.
4. Run focused timer tests, Angular typecheck, and whitespace validation.

## Verification
- [ ] Typecheck/build: `bun run --cwd packages/angular typecheck` failed before timer compilation completed because unrelated toast examples import missing `../toast-example-styles` from `packages/angular/src/toast/examples/*`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/timer/timer.spec.ts` passed (7 tests).
- [ ] Storybook render: Not run; timer changes are limited to story export order and example CSS.
- [x] Manual/visual checks: Compared `packages/angular/src/timer/timer-example-styles.ts` against `.storybook/modules/timer.module.css`; Angular now matches React's unframed flex/tabular-number timer layout.

## Commit
- Hash: Recorded in final response after commit.
- Message: `fix(angular): align timer with react parity`
