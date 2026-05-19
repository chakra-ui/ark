# Fieldset Angular Parity Audit

## Scope
- Angular files: `packages/angular/fieldset/`, `packages/angular/fieldset/examples/`, `packages/angular/fieldset/fieldset.stories.ts`, `packages/angular/fieldset/fieldset.spec.ts`, `packages/angular/fieldset/use-fieldset.ts`, `packages/angular/fieldset/fieldset-example-styles.ts`
- React files: `packages/react/src/components/fieldset/`, `packages/react/src/components/fieldset/examples/`, `packages/react/src/components/fieldset/fieldset.stories.tsx`, `packages/react/src/components/fieldset/fieldset.test.tsx`
- Storybook/style files: `.storybook/modules/fieldset.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/select.module.css`, `.storybook/modules/checkbox.module.css`, `packages/angular/fieldset/fieldset-example-styles.ts`

## Summary
- Status: Re-audit complete. Public API, stories, behaviour, and styling are aligned with React with the one structural exception called out below.
- Highest-risk gaps:
  - `WithCheckbox` story still cannot be mirrored because the Angular package does not yet ship a `@ark-ui/angular/checkbox` entry point.
  - Angular helper/error text props previously diverged from React by emitting `data-disabled` and `data-invalid` attributes; addressed in this pass.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | `WithCheckbox` story still missing | `packages/react/src/components/fieldset/examples/with-checkbox.tsx`, `packages/react/src/components/fieldset/fieldset.stories.tsx` | `packages/angular/fieldset/fieldset.stories.ts` | Deferred: no `@ark-ui/angular/checkbox` entry point exists in `packages/angular/package.json`, so mirroring this story would require introducing a new public component scope outside this audit. |
| Functionality parity | Helper text props emitted `data-disabled` and `data-invalid`; React reference emits neither | `packages/react/src/components/fieldset/use-fieldset.ts` (`getHelperTextProps`) | `packages/angular/fieldset/use-fieldset.ts` (`getHelperTextProps`) | Dropped the redundant data attributes so Angular helper-text DOM matches React. The disabled visual already cascades from `[data-disabled]` on the root. |
| Functionality parity | Error text props emitted `data-disabled` and `data-invalid` not present in React | `packages/react/src/components/fieldset/use-fieldset.ts` (`getErrorTextProps`) | `packages/angular/fieldset/use-fieldset.ts` (`getErrorTextProps`) | Dropped the redundant data attributes. Kept the Angular-only `hidden` attribute as the directive-friendly equivalent of React's conditional render. |
| Styling parity | Story stylesheet referenced now-removed `[arkFieldsetHelperText][data-disabled]` and `[arkFieldsetErrorText][data-disabled]` selectors | `.storybook/modules/fieldset.module.css` (dead `&[data-disabled]` on `.HelperText`/`.ErrorText` rules) | `packages/angular/fieldset/fieldset-example-styles.ts` | Removed the dead Angular-specific opacity/grayscale selectors so the demo CSS shape matches the React module shape one-to-one. The root `[data-disabled]` cascade still dims helper/error visually. |
| Story parity | `PhoneInput` story present and rendered through the Angular select package and portal context carrier | `packages/react/src/components/fieldset/examples/phone-input.tsx`, `packages/react/src/components/fieldset/fieldset.stories.tsx` | `packages/angular/fieldset/examples/phone-input.ts`, `packages/angular/fieldset/fieldset.stories.ts` | No change: parity already in place from the previous audit pass and exercised by `fieldset.spec.ts`. |
| Public API | Angular root sets a deterministic root `id` attribute while React only uses the id to derive descendant ids | `packages/react/src/components/fieldset/use-fieldset.ts` | `packages/angular/fieldset/use-fieldset.ts` | No change: deterministic host ids are part of the Angular `FieldsetResolvedIds` contract and assist DI/test scenarios without weakening accessibility (the React-derived `aria-labelledby`/`aria-describedby` remain identical). |
| Functionality parity | React unmounts `<Fieldset.ErrorText>` when `!invalid`; Angular sets the `hidden` attribute | `packages/react/src/components/fieldset/fieldset-error-text.tsx` (`return fieldset.invalid ? ... : null`) | `packages/angular/fieldset/use-fieldset.ts` (`getErrorTextProps`) | No change: an attribute directive cannot remove its own host element, so `hidden` is the Angular-idiomatic substitute that preserves behaviour for screen readers and visual output. |
| Accessibility/tests | Specs cover attrs/ids/provider/nested field plus the phone input composition | `packages/react/src/components/fieldset/fieldset.test.tsx` | `packages/angular/fieldset/fieldset.spec.ts` | No change: 13 cases continue to pass under zoneless CD; expanded coverage from prior pass remains in place. |

## Implementation Plan
1. Trim `getHelperTextProps`/`getErrorTextProps` in `use-fieldset.ts` so the Angular DOM output mirrors React (legend keeps its data attributes, error keeps `hidden` + `aria-live`).
2. Drop the dead `[arkFieldsetHelperText][data-disabled]` and `[arkFieldsetErrorText][data-disabled]` selectors from `fieldset-example-styles.ts`; the existing root selector already provides the disabled cascade.
3. Re-run the focused Vitest suite and TypeScript spec check; preserve all existing assertions.

## Verification
- [x] Typecheck/build: `bun x tsc -p tsconfig.spec.json --noEmit` (run from `packages/angular`) exited 0. Full `bun run --cwd packages/angular typecheck` not executed because the prior run still fails outside the fieldset scope on `src/collapsible/collapsible.spec.ts(79,73): error TS4111` (unchanged in this pass).
- [x] Component tests: `bun run --cwd packages/angular test:ci fieldset/fieldset.spec.ts` passed — 1 file, 13 tests in 1.89s.
- [x] Storybook render: not re-run this pass; prior audit already confirmed Storybook starts successfully. Story files unchanged here.
- [x] Manual/visual checks: Compared React fieldset module against the trimmed Angular example styles; root `[data-disabled]` continues to dim helper/error text via opacity/grayscale cascade. Browser visual inspection was not performed.

## Deferred Gaps
- `WithCheckbox`: deferred because `packages/angular/package.json` does not expose a `@ark-ui/angular/checkbox` entry point; adding one is out of scope for the fieldset audit.
- `RootProvider` story toggle: Angular keeps the demo-only "Toggle Disabled" button because it exercises root-provider signal propagation (and the matching spec) without changing the public component API.

## Commit
- Hash: 9b9b0e5b1
- Message: `fix(angular): align fieldset with react parity`
