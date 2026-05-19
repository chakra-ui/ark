# Editable Angular Parity Audit

## Scope
- Angular files: `packages/angular/editable/`
- React files: `packages/react/src/components/editable/`
- Storybook/style files: `packages/angular/editable/editable.stories.ts`, `packages/angular/editable/examples/`, `packages/angular/editable/editable-example-styles.ts`, `.storybook/modules/editable.module.css`

## Summary
- Status: Re-audited; no new gaps found. Prior fixes hold across stories, examples, demo styles, public API (detail outputs + named exports), and specs. Verified with the editable Vitest spec (19/19 passing).
- Highest-risk gaps (historical, now closed):
  - Angular Storybook coverage previously omitted the React `Context`, `Controls`, `DoubleClick`, `Textarea`, and `WithField` stories or used different story names. All eight React stories are now mirrored in `editable.stories.ts`.
  - Angular demo styles previously trailed the React CSS module. `editable-example-styles.ts` now matches the React module's layout, sizing, hover/placeholder, submit emphasis, textarea variants, disabled opacity, and helper-text rules using attribute-selector parity.
  - Angular root previously lacked `editChange`, `valueCommit`, `valueRevert`, and the outside-interaction outputs. `ArkEditableRoot` now exposes all six detail outputs and re-exports their event/detail types from `@ark-ui/angular/editable`.

## Re-audit Findings (current pass)
- Stories: `packages/angular/editable/editable.stories.ts` exports `Basic`, `Context`, `Controlled`, `Controls`, `DoubleClick`, `RootProvider`, `Textarea`, `WithField` — names and order match `packages/react/src/components/editable/editable.stories.tsx`.
- Examples: every React example under `packages/react/src/components/editable/examples/*.tsx` has an Angular counterpart in `packages/angular/editable/examples/`. Controlled state uses `[(value)]`, `Context` story uses `#editable="arkEditableRoot"` + `editable.api().editing`, `Controls` swaps between submit/cancel/edit triggers, `DoubleClick` and `Textarea` pass `activationMode="dblclick"`, `Textarea` uses native `<textarea arkEditableInput>` as the input host, and `WithField` composes `arkFieldRoot` with helper/error text.
- Styles: `editable-example-styles.ts` covers `[arkEditableRoot]`/`[arkEditableRootProvider]` layout, disabled opacity, label, area, input/preview shared sizing, preview hover + `[data-placeholder]`, focus-visible ring, control gap, trigger buttons + hover, submit emphasis variant, textarea sizing + placeholder, and helper-text class — matching `.storybook/modules/editable.module.css`.
- Public API: `ArkEditableRoot` declares signal inputs/models/outputs per technical-requirements `model()`/`output()` rules, applies field disabled/required/invalid/readOnly merges via `useEditable`, and wires `ControlValueAccessor` through the shared `createArkCvaController` so reactive forms + `[(value)]` share one source of truth with the documented dev-warning + form-wins precedence.
- Parts: every React descendant has an attribute directive (`ArkEditableArea`, `ArkEditableInput`, `ArkEditablePreview`, `ArkEditableLabel`, `ArkEditableControl`, `ArkEditableEditTrigger`, `ArkEditableSubmitTrigger`, `ArkEditableCancelTrigger`) using DI-based context via `injectArkEditableContext`. `ArkEditableRootProvider` mirrors the React `RootProvider` and re-uses the same context token.
- Preview behavior: `ArkEditablePreview` writes `valueText` into the host only when the consumer left the element empty (`ngAfterContentInit` snapshot of `childNodes.length === 0`), matching React's prop merge that defers to consumer children.
- Input behavior: `ArkEditableInput` strips Zag's `defaultValue` prop and reuses ArkField's global `input`/`textarea` selector for `aria-describedby` rather than duplicating React's `aria-describedby={field?.ariaDescribedby}` line — same behavior, no extra glue needed.
- Aria-describedby parity is asserted in `field.spec.ts`; no editable-specific gap.
- Tests: `editable.spec.ts` covers public surface, missing-context guard, preview initial text, edit/submit/cancel flow, detail outputs, controlled roundtrip + single-emission rule, dblclick activation, textarea host, uncontrolled `defaultValue` seeding, reactive forms write + commit + touched, template-driven `ngModel`, `setDisabledState` via the same machine path, mixed form + `[(value)]` dev warning, Field disabled/required/readOnly merges, bare static `defaultEditing` booleanAttribute, controlled `[editing]` binding, and `NG_VALUE_ACCESSOR` registration.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `Context` story that renders helper text while editing and edit controls otherwise. | `packages/react/src/components/editable/examples/context.tsx` | `packages/angular/editable/editable.stories.ts`, `packages/angular/editable/examples/` | Add Angular `context` example using `#editable="arkEditableRoot"` and export `Context`. |
| Story parity | React `Controls` story exists but Angular has the same behavior under `WithTrigger`. | `packages/react/src/components/editable/examples/controls.tsx` | `packages/angular/editable/examples/with-trigger.ts`, `packages/angular/editable/editable.stories.ts` | Rename/add Angular story and example as `Controls`; keep trigger controls behavior. |
| Story parity | Missing double-click activation example. | `packages/react/src/components/editable/examples/double-click.tsx` | `packages/angular/editable/examples/` | Add `double-click` example with `activationMode="dblclick"` and export `DoubleClick`. |
| Story parity | Missing textarea/as-child equivalent example. | `packages/react/src/components/editable/examples/textarea.tsx` | `packages/angular/editable/examples/` | Add textarea example using `<textarea arkEditableInput>` and matching preview/helper text. |
| Story parity | Angular field story is named `WithFieldValidation` and always invalid; React `WithField` demonstrates neutral field composition. | `packages/react/src/components/editable/examples/with-field.tsx` | `packages/angular/editable/examples/with-field-validation.ts`, `packages/angular/editable/editable.stories.ts` | Add `WithField` story with neutral helper/error text composition. |
| Styling parity | Angular examples miss React layout, sizing, hover, placeholder, disabled, submit, textarea, and helper-text styling. | `.storybook/modules/editable.module.css` | `packages/angular/editable/editable-example-styles.ts` | Expand Angular attribute-selector styles to match the React CSS module. |
| Public API parity | Root lacks non-model detail outputs for edit commit/revert and outside-interaction callbacks. | `packages/react/src/components/editable/editable-root.tsx`, `packages/react/src/components/editable/use-editable.ts` | `packages/angular/editable/editable-root.ts`, `packages/angular/editable/editable.types.ts`, `packages/angular/editable/public-api.ts` | Add `editChange`, `valueCommit`, `valueRevert`, `focusOutside`, `pointerDownOutside`, and `interactOutside` outputs and export their event/detail types. |
| Public API parity | React root prop names are `edit`/`defaultEdit`; Angular uses `editing`/`defaultEditing`. | `packages/react/src/components/editable/editable-root.tsx` | `packages/angular/editable/editable-root.ts` | No change: Angular keeps the clearer model channel name to avoid confusing `[(edit)]`; audit records the intentional naming difference. |
| Functionality parity | Double-click activation, textarea host, placeholder editing, and field inherited required/disabled/readOnly states need Angular test coverage. | `packages/react/src/components/editable/tests/editable.test.tsx` | `packages/angular/editable/editable.spec.ts` | Add focused specs for activation mode, textarea input host, detail outputs, and field state inheritance. |

## Implementation Plan
1. Add missing Angular examples and align Storybook exports with React story names.
2. Update Angular example styles to match the React demo CSS behavior using Angular attribute selectors.
3. Add root detail outputs and public type exports for non-model callback parity.
4. Add targeted Angular tests for the fixed behavior.
5. Run focused editable tests, typecheck if public types change, `git diff --check`, then commit only editable files and this audit.

## Verification
- [x] Typecheck/build: re-audit relied on the previous `bun run --cwd packages/angular build` pass; no new source changes were made, so no further build run was required. `bun run --cwd packages/angular typecheck` remains blocked on the unrelated `src/collapsible/collapsible.spec.ts` index-signature error tracked in the previous audit pass.
- [x] Component tests: `bun run --cwd packages/angular test:ci editable/editable.spec.ts` — 19/19 passing on re-audit.
- [x] Storybook render: covered by the previous smoke-test pass on port 6007; no story/example changes in this re-audit to re-validate.
- [x] Manual/visual checks: re-compared the eight React stories and `.storybook/modules/editable.module.css` to the Angular stories/examples/styles; no drift found. Browser-side screenshots were not captured.

## Commit
- Hash: (re-audit, no source diff; audit doc only)
- Message: `fix(angular): align editable with react parity`
