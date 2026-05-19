# Editable Angular Parity Audit

## Scope
- Angular files: `packages/angular/editable/`
- React files: `packages/react/src/components/editable/`
- Storybook/style files: `packages/angular/editable/editable.stories.ts`, `packages/angular/editable/examples/`, `packages/angular/editable/editable-example-styles.ts`, `.storybook/modules/editable.module.css`

## Summary
- Status: Fixed; Storybook visual parity was smoke-checked via build/startup rather than browser screenshots.
- Highest-risk gaps:
  - Angular Storybook coverage omits the React `Context`, `Controls`, `DoubleClick`, `Textarea`, and `WithField` stories or uses different story names.
  - Angular demo styles are much thinner than the React CSS module and miss preview hover/placeholder, full-width input/preview sizing, submit emphasis, textarea styling, disabled opacity, and helper text.
  - Angular root does not expose detail outputs for `onEditChange`, `onValueCommit`, `onValueRevert`, or the outside-interaction callbacks that React accepts as root props.

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
- [x] Typecheck/build: `bun run --cwd packages/angular build` passed. `bun run --cwd packages/angular typecheck` was attempted and is blocked by unrelated dirty-worktree error `src/collapsible/collapsible.spec.ts(79,73): error TS4111: Property 'id' comes from an index signature, so it must be accessed with ['id'].`
- [x] Component tests: `bun run --cwd packages/angular test:ci editable/editable.spec.ts` passed, 19 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --smoke-test --port 6007` passed. The first attempt on the default port failed because `::1:6006` was already in use.
- [x] Manual/visual checks: Compared React `Basic`, `Context`, `Controlled`, `Controls`, `DoubleClick`, `RootProvider`, `Textarea`, and `WithField` stories plus `.storybook/modules/editable.module.css` against Angular stories/styles. No browser screenshot capture was run.

## Commit
- Hash:
- Message: `fix(angular): align editable with react parity`
