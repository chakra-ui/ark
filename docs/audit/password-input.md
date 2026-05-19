# Password Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/password-input/*`, `packages/angular/password-input/examples/*`
- React files: `packages/react/src/components/password-input/*`, `packages/react/src/components/password-input/examples/*`
- Storybook/style files: `packages/angular/password-input/password-input.stories.ts`, `packages/angular/password-input/password-input-example-styles.ts`, `.storybook/modules/password-input.module.css`

## Summary
- Status: Fixed and verified, with one unrelated package-wide typecheck blocker recorded below.
- Highest-risk gaps: Angular Storybook examples and demo styling did not match the React reference; the Angular indicator had no template-readable visibility state for swapping visible/hidden icon content.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `Autocomplete`, `IgnorePasswordManager`, `StrengthMeter`, and `WithValidation`; controlled story is named `Controlled` instead of `ControlledVisibility`. | `packages/react/src/components/password-input/password-input.stories.tsx` | `packages/angular/password-input/password-input.stories.ts` | Fixed: added missing examples and parity story names. |
| Demo content | Angular examples render text `Toggle` instead of React's visible/hidden icon indicator pattern. | `packages/react/src/components/password-input/examples/*.tsx` | `packages/angular/password-input/examples/*.ts` | Fixed: added local eye icons and use indicator state in examples. |
| Public API ergonomics | React indicator renders children or fallback from `passwordInput.visible`; Angular templates cannot read visibility from `arkPasswordInputIndicator`. | `packages/react/src/components/password-input/password-input-indicator.tsx` | `packages/angular/password-input/password-input-indicator.ts` | Fixed: exposed `visible: Signal<boolean>` on the indicator export. |
| Styling parity | Angular demo styles use inline input/trigger layout; React uses a positioned trigger, max-width root, invalid/focus states, strength meter, and validation message styles. | `.storybook/modules/password-input.module.css` | `packages/angular/password-input/password-input-example-styles.ts` | Fixed: aligned Angular example styles with React CSS selectors. |
| Accessibility | Existing root/input tests cover label IDs, disabled/readOnly/invalid propagation, CVA, and visibility toggle. Story examples should keep labeled inputs and button indicators. | `packages/react/src/components/password-input/*` | `packages/angular/password-input/password-input.spec.ts` | Fixed: added example mount coverage and indicator visibility coverage. |
| Functionality | Core Zag mapping, field context, form integration, boolean transforms, and visibility/value model channels are present. | `packages/react/src/components/password-input/use-password-input.ts` | `packages/angular/password-input/use-password-input.ts`, `packages/angular/password-input/password-input-root.ts` | No change. |

## Implementation Plan
1. Expose visibility on `ArkPasswordInputIndicator`.
2. Add local Angular eye icon components and update examples to use indicator state.
3. Add missing React-parity examples and story exports.
4. Align example styles with the React CSS module.
5. Add focused tests for indicator visibility and Storybook example mounting.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by unrelated existing `number-input/use-number-input.ts(53,9): error TS1117: An object literal cannot have multiple properties with the same name.`
- [x] Component tests: `bun run --cwd packages/angular test:ci password-input/password-input.spec.ts` passed, 1 file / 15 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --ci` reached "Storybook ready" at `http://localhost:6007/`; process stopped after startup verification.
- [x] Manual/visual checks: Confirmed from code and Storybook startup that `Basic`, `Autocomplete`, `ControlledVisibility`, `IgnorePasswordManager`, `RootProvider`, `WithField`, `StrengthMeter`, `WithValidation`, and the extra Angular `DefaultVisible` story are registered and mount through tests.

## Commit
- Hash:
- Message: fix(angular): align password input with react parity
