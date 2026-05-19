# Pin Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/pin-input/`
- React files: `packages/react/src/components/pin-input/`
- Storybook/style files: `packages/angular/pin-input/pin-input.stories.ts`, `packages/angular/pin-input/examples/`, `packages/angular/pin-input/pin-input-example-styles.ts`, `.storybook/modules/pin-input.module.css`

## Summary
- Status: Fixed and verified.
- Highest-risk gaps: Angular root did not expose the React `onValueComplete` callback as a `(valueComplete)` output, root-provider child inputs did not register slot count through the same Angular path as root child inputs, and Angular Storybook missed React's `BlurOnComplete`, `CustomPlaceholder`, and `Mask` examples.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | React root accepts `onValueComplete`; Angular only marked the CVA touched and exposed no `(valueComplete)` output. | `packages/react/src/components/pin-input/pin-input-root.tsx`, `packages/react/src/components/pin-input/tests/pin-input.test.tsx` | `packages/angular/pin-input/pin-input-root.ts` | Add `valueComplete` output that emits `PinInputValueChangeDetails` from Zag's `onValueComplete`, preserving CVA touched behavior. |
| Functionality parity | Root-provider children could not register input indices with the parent count registrar, so Angular root-provider examples relied on Zag DOM counting after construction instead of the explicit slot-count path used by `ArkPinInputRoot`. | `packages/react/src/components/pin-input/examples/root-provider.tsx` | `packages/angular/pin-input/pin-input-root-provider.ts`, `packages/angular/pin-input/pin-input-input.ts` | Provide `ARK_PIN_INPUT_COUNT_REGISTRAR` from `ArkPinInputRootProvider` and update its machine context count from registered indices. |
| Story parity | Missing React stories: `BlurOnComplete`, `CustomPlaceholder`, and `Mask`; OTP story name differed from React's `OTPMode`. | `packages/react/src/components/pin-input/pin-input.stories.tsx`, `packages/react/src/components/pin-input/examples/` | `packages/angular/pin-input/pin-input.stories.ts`, `packages/angular/pin-input/examples/` | Add the three examples and stories, and export the OTP story as `OTPMode`. Keep Angular's controlled story as an Angular-specific additional coverage story. |
| Storybook styling parity | Angular example styles used smaller inputs, tighter gaps, different border tokens, and lacked placeholder, disabled, and invalid selectors present in React demo CSS. | `.storybook/modules/pin-input.module.css` | `packages/angular/pin-input/pin-input-example-styles.ts` | Align root/control/input sizing, focus, placeholder, disabled, and invalid selectors with React's CSS module using Angular attribute selectors. |
| Test parity | React tests cover `onValueComplete`, OTP autocomplete, placeholder/mask behavior indirectly through examples, and root-provider focus. Angular tests lacked `(valueComplete)` and root-provider count coverage. | `packages/react/src/components/pin-input/tests/pin-input.test.tsx` | `packages/angular/pin-input/pin-input.spec.ts` | Add component specs for `(valueComplete)`, OTP autocomplete, placeholder/mask props, and root-provider count/focus behavior. |

## Implementation Plan
1. Add `(valueComplete)` output to `ArkPinInputRoot`.
2. Make `ArkPinInputRootProvider` implement the pin-input count registrar and provide it to child inputs.
3. Add missing Angular examples/stories for blur-on-complete, custom-placeholder, and mask; align OTP story export name.
4. Align Angular Storybook styles with the React `pin-input.module.css` selectors.
5. Add focused Angular specs for the closed gaps.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, production `ng build @ark-ui/angular`, and `scripts/check-forms-isolation.ts`.
- [x] Component tests: `bun run --cwd packages/angular test:ci pin-input/pin-input.spec.ts` passed with 13 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started successfully on port 6007 after port 6006 was occupied; webpack compiled to 100% with existing unused-compilation warnings, then the dev server was interrupted.
- [x] Manual/visual checks: Compared `.storybook/modules/pin-input.module.css` against `packages/angular/pin-input/pin-input-example-styles.ts`; Angular examples now cover Basic, BlurOnComplete, CustomPlaceholder, OTPMode, RootProvider, WithField, Mask, plus an Angular-only Controlled story.

## Commit
- Hash: See commit metadata.
- Message: `fix(angular): align pin-input with react parity`
