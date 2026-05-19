# Number Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/number-input/number-input-root.ts`, `packages/angular/number-input/number-input-root-provider.ts`, `packages/angular/number-input/number-input-control.ts`, `packages/angular/number-input/number-input-input.ts`, `packages/angular/number-input/number-input-label.ts`, `packages/angular/number-input/number-input-increment-trigger.ts`, `packages/angular/number-input/number-input-decrement-trigger.ts`, `packages/angular/number-input/number-input-scrubber.ts`, `packages/angular/number-input/number-input-value-text.ts`, `packages/angular/number-input/use-number-input.ts`, `packages/angular/number-input/use-number-input-context.ts`, `packages/angular/number-input/number-input.types.ts`, `packages/angular/number-input/number-input.anatomy.ts`, `packages/angular/number-input/public-api.ts`, `packages/angular/number-input/number-input.spec.ts`, `packages/angular/number-input/number-input.stories.ts`, `packages/angular/number-input/examples/`, `packages/angular/number-input/number-input-example-styles.ts`
- React files: `packages/react/src/components/number-input/number-input-root.tsx`, `packages/react/src/components/number-input/number-input-context.tsx`, `packages/react/src/components/number-input/number-input-root-provider.tsx`, `packages/react/src/components/number-input/use-number-input.ts`, `packages/react/src/components/number-input/use-number-input-context.ts`, `packages/react/src/components/number-input/examples/`, `packages/react/src/components/number-input/tests/number-input.test.tsx`
- Storybook/style files: `packages/react/src/components/number-input/number-input.stories.tsx`, `.storybook/modules/number-input.module.css`, `packages/angular/number-input/number-input.stories.ts`, `packages/angular/number-input/number-input-example-styles.ts`

## Summary
- Status: Re-audited. Angular parity remains intact after a fresh pass — no new gaps detected on top of the previously closed audit. All targeted Angular tests pass, the Angular package typecheck/build succeeds, and the Storybook smoke startup exits clean.
- Highest-risk gaps: None outstanding for this component.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root `locale` input. | `packages/react/src/components/number-input/number-input-root.tsx` | `packages/angular/number-input/number-input-root.ts` | Already closed: `locale` signal input is declared and forwarded through `useNumberInput`, falling back to the locale provider. |
| Public API | `onFocusChange`, `onValueCommit`, `onValueInvalid` parity. | `packages/react/src/components/number-input/number-input-root.tsx` | `packages/angular/number-input/number-input-root.ts` | Already closed: `(focusChange)`, `(valueCommit)`, `(valueInvalid)` outputs emit Zag detail objects unchanged. `(valueChange)` is provided by the `value` model. |
| Public API | `NumberInput.Context` render-prop equivalent. | `packages/react/src/components/number-input/number-input-context.tsx` | `packages/angular/number-input/number-input-root.ts` (`exportAs: 'arkNumberInputRoot'`) | No change: Angular uses the Root directive's `exportAs` + template reference as documented in `docs/technical-requirements.md` §5 ("The Ark `Context` part"). The `Context` example demonstrates this with `#numberInput="arkNumberInputRoot"`. |
| Stories | Parity with React story list (Basic, Formatting, FractionDigits, MinMax, MouseWheel, Context, RootProvider, Scrubber, WithField). | `packages/react/src/components/number-input/number-input.stories.tsx` | `packages/angular/number-input/number-input.stories.ts` | Already closed: all React stories mirrored. Angular also exports an extra `Controlled` story to exercise the `model()` two-way `[(value)]` channel — Angular-specific addition, retained. |
| Styling | Bordered control with overlaid trigger group, focus-visible state, invalid state, scrubber overlay, has-scrubber input padding. | `.storybook/modules/number-input.module.css` | `packages/angular/number-input/number-input-example-styles.ts` | Already closed: selectors mirror the React module (`[arkNumberInputRoot]`, `[arkNumberInputInput][data-has-scrubber]`, focus/invalid/disabled states, `.trigger-group`, `[arkNumberInputScrubber]`). |
| Tests | Coverage for outputs, formatting, field/CVA integration, single-emission rule, mixed-source diagnostic. | `packages/react/src/components/number-input/tests/number-input.test.tsx` | `packages/angular/number-input/number-input.spec.ts` | Already closed: 16 specs cover increment/decrement, min/max clamping, valueInvalid, valueCommit + focusChange emissions, locale + fraction formatting, Field merge, reactive + template forms, single emission, touched, setDisabledState, static `disabled`, and mixed form + `[(value)]` precedence + warning. |
| Tooling | `bun run --cwd packages/angular typecheck` was previously blocked by unrelated `listbox`/`navigation-menu` errors. | n/a | n/a | Resolved in those components since the prior audit. The package typecheck and build now complete cleanly end-to-end. |

## Implementation Plan
1. Re-read existing audit and React/Angular source side-by-side (done).
2. Re-verify Root API parity: all React props/callbacks have Angular inputs/model/outputs (done).
3. Re-verify story parity and example fidelity (done).
4. Re-verify Angular example styles against React module CSS selectors and state styling (done).
5. Re-run targeted specs and broaden to package typecheck/build and Storybook smoke (done).
6. Update audit verification block and commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` — completes; Angular Package Format build succeeds for every entry point. The forms-isolation check (`scripts/check-forms-isolation.ts`) reports ok.
- [x] Component tests: `bun run --cwd packages/angular test:ci number-input/number-input.spec.ts` — 16 tests passed, 1 file.
- [x] Storybook render: `bun run --cwd packages/angular storybook --ci --smoke-test --quiet` — exited 0.
- [x] Manual/visual checks: Compared `packages/react/src/components/number-input/number-input.stories.tsx`, every React example file, and `.storybook/modules/number-input.module.css` against the Angular stories, examples, and example styles. Angular covers Basic, Controlled (extra), Formatting, FractionDigits, MinMax, MouseWheel, Context, WithField, RootProvider, Scrubber with matching markup and styling tokens.
- [x] Diff check: `git diff --check` — clean.

## Commit
- Hash: 5b6441e79
- Message: fix(angular): align number-input with react parity
