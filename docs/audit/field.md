# Field Angular Parity Audit

## Scope
- Angular files: `packages/angular/field/field-root.ts`, `packages/angular/field/field-root-provider.ts`, `packages/angular/field/field-input.ts`, `packages/angular/field/field-textarea.ts`, `packages/angular/field/field-select.ts`, `packages/angular/field/field-label.ts`, `packages/angular/field/field-helper-text.ts`, `packages/angular/field/field-error-text.ts`, `packages/angular/field/field-required-indicator.ts`, `packages/angular/field/field-item.ts`, `packages/angular/field/use-field.ts`, `packages/angular/field/use-field-context.ts`, `packages/angular/field/public-api.ts`, `packages/angular/field/field.stories.ts`, `packages/angular/field/examples/*`, `packages/angular/field/field-example-styles.ts`, `packages/angular/field/field.spec.ts`.
- React files: `packages/react/src/components/field/field.ts`, `packages/react/src/components/field/field-root.tsx`, `packages/react/src/components/field/field-root-provider.tsx`, `packages/react/src/components/field/field-input.tsx`, `packages/react/src/components/field/field-textarea.tsx`, `packages/react/src/components/field/field-select.tsx`, `packages/react/src/components/field/field-label.tsx`, `packages/react/src/components/field/field-helper-text.tsx`, `packages/react/src/components/field/field-error-text.tsx`, `packages/react/src/components/field/field-required-indicator.tsx`, `packages/react/src/components/field/field-item.tsx`, `packages/react/src/components/field/field-context.tsx`, `packages/react/src/components/field/use-field.ts`, `packages/react/src/components/field/field.test.tsx`, `packages/react/src/components/field/examples/*`.
- Storybook/style files: `packages/react/src/components/field/field.stories.tsx`, `packages/angular/field/field.stories.ts`, `.storybook/modules/field.module.css`, `packages/angular/field/field-example-styles.ts`.

## Summary
- Status: Re-audited. Earlier fix landed in `978c4d04f`. This re-audit pass tightened helper-text and error-text prop bags so Angular no longer emits extra `data-invalid`/`data-disabled` attributes that React does not produce. All other parity items remain in place.
- Highest-risk gaps: None outstanding. The previously deferred `ShadowDom` story is still tracked as infrastructure-level parity (no environment-provider entry point in Angular field), not a directive-behavior gap.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | `Field.Textarea` supports an `autoresize` prop; Angular needed a matching input. | `packages/react/src/components/field/field-textarea.tsx` | `packages/angular/field/field-textarea.ts` | Fixed in `978c4d04f`: `autoresize` boolean input wired to `@zag-js/auto-resize`, preserves `resize: none` while enabled, SSR-guarded. |
| Story parity | `CustomControl` and `TextareaAutoresize` stories were missing. | `packages/react/src/components/field/field.stories.tsx`, `packages/react/src/components/field/examples/custom-control.tsx`, `packages/react/src/components/field/examples/textarea-autoresize.tsx` | `packages/angular/field/field.stories.ts`, `packages/angular/field/examples/` | Fixed in `978c4d04f`. Angular `CustomControl` uses `[arkProps]` with `useField()` as the escape hatch. |
| Functionality parity | Required indicator was always rendered; React returns `null` when `field.required` is false. | `packages/react/src/components/field/field-required-indicator.tsx` | `packages/angular/field/use-field.ts` | Fixed in `978c4d04f`: directive applies `hidden` when not required (Angular cannot remove its host element, so it stays in the tree but is hidden). |
| Styling parity | Angular demo styles drifted from `.storybook/modules/field.module.css`. | `.storybook/modules/field.module.css` | `packages/angular/field/field-example-styles.ts` | Fixed in `978c4d04f`: aligned root, label, control, select, textarea, invalid, focus, disabled, helper, and error styles. |
| Story content parity | Invalid, required-indicator, and select example labels/options diverged. | `packages/react/src/components/field/examples/*` | `packages/angular/field/examples/*` | Fixed in `978c4d04f`: matched labels, placeholders, and options. |
| Functionality parity | Angular `getHelperTextProps()` emitted `data-invalid` that React does not. | `packages/react/src/components/field/use-field.ts` | `packages/angular/field/use-field.ts` | Removed `data-invalid` from `getHelperTextProps()` so the attribute set matches React (`data-disabled` only). |
| Functionality parity | Angular `getErrorTextProps()` emitted `data-disabled` and `data-invalid` that React does not. | `packages/react/src/components/field/use-field.ts` | `packages/angular/field/use-field.ts` | Removed `data-disabled` and `data-invalid` from `getErrorTextProps()`; kept Angular-specific `hidden` workaround (Angular directives cannot remove their host node when invalid is false). |
| Test parity | No regression test pinning the helper/error data-attribute parity. | `packages/react/src/components/field/field.test.tsx` (implicit) | `packages/angular/field/field.spec.ts` | Added spec asserting helper-text carries only `data-disabled` and error-text carries neither `data-disabled` nor `data-invalid` while keeping `aria-live="polite"`. |
| Accessibility parity | Error text is hidden via `hidden` rather than structurally removed when invalid is false. | `packages/react/src/components/field/field-error-text.tsx` | `packages/angular/field/use-field.ts` | No change. Angular directives cannot remove their host node. `hidden` preserves user-visible behavior and ARIA exclusion. |
| Story parity | React has a `ShadowDom` example using `EnvironmentProvider`; Angular field has no matching environment provider in this entry point. | `packages/react/src/components/field/examples/shadow-dom.tsx` | `packages/angular/field/field.stories.ts` | Deferred. Tracked as provider/story infrastructure parity rather than field directive behavior. |

## Implementation Plan
1. Re-confirm baseline by re-reading React and Angular sources, demo CSS, stories, and the existing audit.
2. Tighten `getHelperTextProps()` / `getErrorTextProps()` in `packages/angular/field/use-field.ts` to drop the React-incompatible `data-invalid` / `data-disabled` keys.
3. Add a focused spec that pins the helper/error data-attribute parity together with the existing `aria-live="polite"` assertion.
4. Re-run focused tests and typecheck.
5. Update this audit file and commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` succeeded (tsc, tsc spec, ng-packagr partial build for every secondary entry point, forms-isolation check `ok`).
- [x] Component tests: `bun run --cwd packages/angular test:ci field/field.spec.ts` — 1 file, 21 tests passed (20 prior + 1 new helper/error parity test).
- [x] Storybook render: Skipped this pass (already verified in `978c4d04f`); no story-surface changes were made in the re-audit fixes.
- [x] Manual/visual checks: Compared Angular `getHelperTextProps`/`getErrorTextProps` outputs to React `use-field.ts` by source inspection; demo CSS unchanged so existing visual verification still applies.

## Commit
- Hash: `pending`
- Message: `fix(angular): align field with react parity`
