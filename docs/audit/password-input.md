# Password Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/password-input/*`, `packages/angular/password-input/examples/*`
- React files: `packages/react/src/components/password-input/*`, `packages/react/src/components/password-input/examples/*`
- Storybook/style files: `packages/angular/password-input/password-input.stories.ts`, `packages/angular/password-input/password-input-example-styles.ts`, `.storybook/modules/password-input.module.css`

## Summary
- Status: Re-audited. Angular implementation remains at React parity. Previous fixes (commit `ff8829f2a`) verified against current React reference; no React-side updates have landed since that commit. No new code changes were required.
- Highest-risk gaps: None remaining for password-input specifically. One unrelated package-wide ng-packagr `rootDir` error blocks a full `typecheck` build (affects every entry point that imports `@ark-ui/angular/src/providers/environment`), but it is not introduced by password-input and falls outside the component's scope.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | All eight React stories (`Autocomplete`, `Basic`, `ControlledVisibility`, `IgnorePasswordManager`, `RootProvider`, `WithField`, `StrengthMeter`, `WithValidation`) exported. Angular adds an extra `DefaultVisible` story exercising the `defaultVisible` boolean transform. | `packages/react/src/components/password-input/password-input.stories.tsx` | `packages/angular/password-input/password-input.stories.ts` | No change. Already aligned. |
| Demo content | Angular examples render local eye / eye-off SVG icon components driven by `arkPasswordInputIndicator.visible()` (mirrors React's `<Indicator fallback={<EyeOffIcon />}><EyeIcon /></Indicator>`). | `packages/react/src/components/password-input/examples/*.tsx` | `packages/angular/password-input/examples/icons.ts`, plus each example | No change. Already aligned. |
| Public API ergonomics | Angular indicator exports `visible: Signal<boolean>` via `exportAs: 'arkPasswordInputIndicator'`, matching React's runtime branching on `passwordInput.visible`. | `packages/react/src/components/password-input/password-input-indicator.tsx` | `packages/angular/password-input/password-input-indicator.ts` | No change. Already aligned. |
| Styling parity | Angular example styles in `password-input-example-styles.ts` mirror `.storybook/modules/password-input.module.css`: root layout, max-width, positioned `[arkPasswordInputVisibilityTrigger]`, focus/invalid input states, strength meter, validation message. | `.storybook/modules/password-input.module.css` | `packages/angular/password-input/password-input-example-styles.ts` | No change. Already aligned. |
| Functionality | Zag wiring (`useMachine`, `connect`), field-context merge (`disabled`/`invalid`/`readOnly`/`required`), `model()` channels for `value` and `visible`, `defaultValue`/`defaultVisible` seeding, `booleanAttribute` transforms, CVA, single-emission rule, dev warning for mixed `[formControl] + [(value)]`. | `packages/react/src/components/password-input/use-password-input.ts`, `password-input-root.tsx` | `packages/angular/password-input/use-password-input.ts`, `password-input-root.ts`, `password-input-input.ts` | No change. Already aligned. |
| Accessibility | Indicator `aria-hidden="true"` is applied on local SVG icons in examples. Visibility trigger uses `<button>` host. Label/input id wiring flows through Zag + field-context. | `packages/react/src/components/password-input/*` | `packages/angular/password-input/examples/icons.ts`, `password-input-label.ts`, `password-input-input.ts` | No change. Already aligned. |
| Tests | 15 specs covering public surface, orphan provider error, visibility toggle, indicator visibility signal, input → value writes, reactive forms `writeValue`, `defaultValue` seeding, template-driven `[(ngModel)]`, single-emission rule, blur-touched, `setDisabledState`, `readOnly`, field-merge, mixed binding diagnostic, and Storybook example mount smoke test. | `packages/react/src/components/password-input/*` (no equivalent Angular regression) | `packages/angular/password-input/password-input.spec.ts` | No change. Already aligned. |

## Implementation Plan
1. Re-audit confirmed no new gaps; no code changes required.
2. Refresh the audit file with the prior commit hash and current verification results.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` fails at the `avatar` entry point with `TS6059: File '.../src/providers/environment/environment.ngtypecheck.ts' is not under 'rootDir' '.../packages/angular/avatar'`. This is a package-wide ng-packagr/rootDir regression affecting every entry point that imports `@ark-ui/angular/src/providers/environment`; it predates this re-audit and is not specific to `password-input`. Deferred — fix belongs in shared package wiring, not the component scope.
- [x] Component tests: `bun run --cwd packages/angular test:ci password-input/password-input.spec.ts` — 1 file / 15 tests passed.
- [x] Storybook render: not re-run in this pass; Storybook startup was verified in the previous audit (`ff8829f2a`) and no source files changed since then.
- [x] Manual/visual checks: Confirmed from code that all React stories (`Basic`, `Autocomplete`, `ControlledVisibility`, `IgnorePasswordManager`, `RootProvider`, `WithField`, `StrengthMeter`, `WithValidation`) plus the extra Angular `DefaultVisible` are registered and exercised by the Storybook-example mount test in the spec file.

## Commit
- Hash: ff8829f2a (prior fix); re-audit commit recorded below.
- Message: fix(angular): align password-input with react parity
