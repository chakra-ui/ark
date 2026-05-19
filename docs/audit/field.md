# Field Angular Parity Audit

## Scope
- Angular files: `packages/angular/field/field-root.ts`, `packages/angular/field/field-root-provider.ts`, `packages/angular/field/field-input.ts`, `packages/angular/field/field-textarea.ts`, `packages/angular/field/field-select.ts`, `packages/angular/field/field-label.ts`, `packages/angular/field/field-helper-text.ts`, `packages/angular/field/field-error-text.ts`, `packages/angular/field/field-required-indicator.ts`, `packages/angular/field/field-item.ts`, `packages/angular/field/use-field.ts`, `packages/angular/field/public-api.ts`, `packages/angular/field/field.stories.ts`, `packages/angular/field/examples/*`, `packages/angular/field/field-example-styles.ts`, `packages/angular/field/field.spec.ts`.
- React files: `packages/react/src/components/field/field.ts`, `packages/react/src/components/field/field-root.tsx`, `packages/react/src/components/field/field-root-provider.tsx`, `packages/react/src/components/field/field-input.tsx`, `packages/react/src/components/field/field-textarea.tsx`, `packages/react/src/components/field/field-select.tsx`, `packages/react/src/components/field/field-label.tsx`, `packages/react/src/components/field/field-helper-text.tsx`, `packages/react/src/components/field/field-error-text.tsx`, `packages/react/src/components/field/field-required-indicator.tsx`, `packages/react/src/components/field/field-item.tsx`, `packages/react/src/components/field/field-context.tsx`, `packages/react/src/components/field/use-field.ts`, `packages/react/src/components/field/field.test.tsx`, `packages/react/src/components/field/examples/*`.
- Storybook/style files: `packages/react/src/components/field/field.stories.tsx`, `packages/angular/field/field.stories.ts`, `.storybook/modules/field.module.css`, `.storybook/modules/button.module.css`, `packages/angular/field/field-example-styles.ts`.

## Summary
- Status: Fixed Angular field parity gaps for textarea autoresize, custom control and autoresize stories, required-indicator visibility, and Storybook style/content drift.
- Highest-risk gaps: `arkFieldTextarea` lacked React's `autoresize` behavior; Angular Storybook omitted React's `CustomControl` and `TextareaAutoresize` examples; required indicator remained visible for non-required fields unless consumers added their own structural guard.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | `Field.Textarea` supports an `autoresize` prop, but `ArkFieldTextarea` had no matching input or behavior. | `packages/react/src/components/field/field-textarea.tsx` | `packages/angular/field/field-textarea.ts` | Add `autoresize` boolean input, wire `@zag-js/auto-resize`, and preserve `resize: none` while enabled. |
| Story parity | `CustomControl` and `TextareaAutoresize` stories were missing. | `packages/react/src/components/field/field.stories.tsx`, `packages/react/src/components/field/examples/custom-control.tsx`, `packages/react/src/components/field/examples/textarea-autoresize.tsx` | `packages/angular/field/field.stories.ts`, `packages/angular/field/examples/` | Add Angular examples and stories. Use `[arkProps]` with `useField()` for the custom-control escape hatch. |
| Functionality parity | Required indicator was always rendered when the directive existed; React returns `null` when the field is not required. | `packages/react/src/components/field/field-required-indicator.tsx` | `packages/angular/field/use-field.ts` | Add `hidden` to required-indicator props when the field is not required. |
| Styling parity | Angular demo styles used smaller padding, outline-only focus styling, no select chevron, no disabled root treatment, and smaller helper/error text than the React CSS module. | `.storybook/modules/field.module.css` | `packages/angular/field/field-example-styles.ts` | Align root, label, control, select, textarea, invalid, focus, disabled, helper, and error styles with the React demo CSS. |
| Story content parity | Invalid, required-indicator, and select examples used different labels/options/copy than React. | `packages/react/src/components/field/examples/invalid.tsx`, `required-indicator.tsx`, `select.tsx` | `packages/angular/field/examples/invalid.ts`, `required-indicator.ts`, `select.ts` | Match labels, placeholder, and option text/values. |
| Accessibility parity | Error text is hidden rather than structurally removed when invalid is false. | `packages/react/src/components/field/field-error-text.tsx` | `packages/angular/field/use-field.ts` | No change. Angular directives cannot remove their host; `hidden` preserves user-visible behavior and ARIA exclusion. |
| Story parity | React has a `ShadowDom` example using `EnvironmentProvider`; Angular field has no matching environment provider API in this entry point. | `packages/react/src/components/field/examples/shadow-dom.tsx` | `packages/angular/field/field.stories.ts` | Deferred. Track as provider/story infrastructure parity rather than field directive behavior. |

## Implementation Plan
1. Add the audit file before modifying Angular code.
2. Implement `arkFieldTextarea` autoresize with a boolean input, browser guard, and teardown.
3. Hide `arkFieldRequiredIndicator` when the current field is not required.
4. Add Angular `CustomControl` and `TextareaAutoresize` examples and wire them into Storybook.
5. Align Angular field example styles and mismatched story copy/options with the React references.
6. Add focused specs for autoresize, required-indicator hidden behavior, new examples, and custom control prop application.
7. Run focused tests, typecheck, and `git diff --check`; update this file with results and commit metadata.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed: `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, production package build, and forms isolation check.
- [x] Component tests: `bun run --cwd packages/angular test:ci field/field.spec.ts` passed: 1 file, 20 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007` reached "Storybook ready!" at `http://localhost:6007/`; stopped with Ctrl-C after startup verification.
- [x] Manual/visual checks: Compared Angular `fieldExampleStyles` and examples against `.storybook/modules/field.module.css` and React field examples by source inspection; live browser story-by-story visual inspection not performed.

## Commit
- Hash: `978c4d04f`
- Message: `fix(angular): align field with react parity`
