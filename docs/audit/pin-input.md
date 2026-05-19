# Pin Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/pin-input/`
- React files: `packages/react/src/components/pin-input/`
- Storybook/style files: `packages/angular/pin-input/pin-input.stories.ts`, `packages/angular/pin-input/examples/`, `packages/angular/pin-input/pin-input-example-styles.ts`, `.storybook/modules/pin-input.module.css`

## Summary
- Status: Re-audited; one new parity gap fixed.
- Previously closed (prior pass): Root `(valueComplete)` output, root-provider count registrar wiring, missing `BlurOnComplete`/`CustomPlaceholder`/`Mask` stories, OTP story rename to `OTPMode`, demo styling alignment, and behavior specs for value-complete / OTP autocomplete / placeholder / mask / root-provider count.
- New gap closed this pass: Hidden input did not propagate `field.ariaDescribedby` to its host element, while React's `PinInputHiddenInput` spreads `aria-describedby={field?.ariaDescribedby}` from the surrounding `Field` context. Without this, helper/error text ids were not announced for users of `[(ngModel)]`/`formControl`-driven hidden inputs nested in `arkFieldRoot`.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity (prior pass) | React root accepts `onValueComplete`; Angular only marked CVA touched and exposed no `(valueComplete)` output. | `packages/react/src/components/pin-input/pin-input-root.tsx` | `packages/angular/pin-input/pin-input-root.ts` | Added `valueComplete` output emitting `PinInputValueChangeDetails`, preserving CVA touched behavior. (Resolved previously.) |
| Functionality parity (prior pass) | Root-provider children could not register input indices with the parent count registrar. | `packages/react/src/components/pin-input/examples/root-provider.tsx` | `packages/angular/pin-input/pin-input-root-provider.ts`, `pin-input-input.ts` | Provided `ARK_PIN_INPUT_COUNT_REGISTRAR` from `ArkPinInputRootProvider`. (Resolved previously.) |
| Story parity (prior pass) | Missing `BlurOnComplete`, `CustomPlaceholder`, `Mask` stories; OTP story name differed. | `packages/react/src/components/pin-input/pin-input.stories.tsx` | `packages/angular/pin-input/pin-input.stories.ts`, `examples/` | Added the three stories and exported `OTPMode`. (Resolved previously.) |
| Storybook styling parity (prior pass) | Angular example styles diverged from React CSS. | `.storybook/modules/pin-input.module.css` | `packages/angular/pin-input/pin-input-example-styles.ts` | Aligned sizing, focus, placeholder, disabled, invalid selectors. (Resolved previously.) |
| Test parity (prior pass) | Missing coverage for `valueComplete`, OTP autocomplete, placeholder/mask, and root-provider count/focus. | `packages/react/src/components/pin-input/tests/pin-input.test.tsx` | `packages/angular/pin-input/pin-input.spec.ts` | Added specs for those areas. (Resolved previously.) |
| Accessibility parity (this pass) | Angular `ArkPinInputHiddenInput` did not forward `field.ariaDescribedby`. React's `PinInputHiddenInput` spreads `aria-describedby={field?.ariaDescribedby}` so helper/error text ids reach assistive tech. | `packages/react/src/components/pin-input/pin-input-hidden-input.tsx` | `packages/angular/pin-input/pin-input-hidden-input.ts` | Inject the optional `ArkField` context and merge `'aria-describedby': field?.ariaDescribedby()` into the hidden-input prop bag (same pattern used by `tags-input`/`file-upload`/`signature-pad` hidden inputs). |
| Test parity (this pass) | No regression coverage for the hidden input picking up `field.ariaDescribedby`. | `packages/react/src/components/pin-input/tests/pin-input.test.tsx` (`PinInput / Field` group) | `packages/angular/pin-input/pin-input.spec.ts` | Added a spec that mounts `arkFieldRoot` + `arkFieldHelperText` around the pin input and asserts the hidden input's `aria-describedby` contains the field's `helper-text` id. |

## Implementation Plan
1. Update `ArkPinInputHiddenInput` to inject the optional field context and merge `'aria-describedby'` from `field.ariaDescribedby()` into the applied prop bag.
2. Add a spec verifying the hidden input receives `aria-describedby` from a surrounding `arkFieldRoot` with `arkFieldHelperText`.
3. Re-run typecheck/build and the focused pin-input spec.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed (`tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, production `ng build @ark-ui/angular`, and `scripts/check-forms-isolation.ts` all succeeded).
- [x] Component tests: `bun run --cwd packages/angular test:ci pin-input/pin-input.spec.ts` passed with 14 tests (13 prior + the new aria-describedby test).
- [x] Storybook render: Not re-run this pass; storybook startup was verified in the prior audit pass and only Angular files for pin-input changed in this pass (no story/example changes).
- [x] Manual/visual checks: Re-read React `pin-input-hidden-input.tsx` to confirm the `aria-describedby` forward pattern; compared to neighboring Angular hidden inputs (`tags-input-hidden-input`, `file-upload-hidden-input`, `signature-pad-hidden-input`, `date-input-hidden-input`, `color-picker-hidden-input`) for the same wiring shape.

## Deferred / Notes
- Angular keeps an additional `Controlled` story not in the React stories file. It mirrors the existing React example pattern for controlled state on other components and is retained as Angular-specific coverage. No change.
- Angular's `usePinInput` composes a colon-free `safeRootId` to satisfy jsdom selector parsers when ids contain double-colon separators. This is an intentional Angular-side hardening — React's React-DOM environment does not need it. No change.

## Commit
- Hash: See commit metadata after commit.
- Message: `fix(angular): align pin-input with react parity`
