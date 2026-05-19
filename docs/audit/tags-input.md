# Tags Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/tags-input/`
- React files: `packages/react/src/components/tags-input/`
- Storybook/style files: `packages/angular/tags-input/tags-input.stories.ts`, `packages/angular/tags-input/tags-input-example-styles.ts`, `.storybook/modules/tags-input.module.css`

## Summary
- Status: Re-audit confirms parity. Public API, field integration, demo styling, tests, and Storybook examples are aligned with the React reference. The only remaining gap is `WithCombobox`, which depends on a cross-primitive composition pattern that is intentionally out of scope.
- Highest-risk gaps: `WithCombobox` remains deferred — React composes `Combobox.Input asChild` with `TagsInput.Input` on the same input element. Angular's `arkComboboxInput` and `arkTagsInputInput` each call `applyArkProps` independently against the host, so stacking both on one `<input>` would have them fight over `id`, `value`, and event listeners. Closing this needs a documented multi-directive composition primitive before the example can be represented without ad hoc behavior.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `TagsInput.Item` accepted `index` and `value` only, while React item props also include `disabled`. | `packages/react/src/components/tags-input/tags-input-item.tsx` | `packages/angular/tags-input/tags-input-item.ts` | Boolean `disabled` input present and forwarded to all item descendant prop calls. Verified by `passes item disabled state to Zag item props` spec. |
| Public API | Root previously did not expose outputs for non-model Zag callbacks. | `packages/react/src/components/tags-input/tags-input-root.tsx` | `packages/angular/tags-input/tags-input-root.ts` | Root declares `highlightChange`, `valueInvalid`, `focusOutside`, `pointerDownOutside`, and `interactOutside` outputs plus public event type re-exports. Verified by `forwards tags input callback props as Angular outputs` spec. |
| Field/accessibility | Field IDs originally targeted the visible input instead of the hidden input, and the hidden input missed field `aria-describedby`. | `packages/react/src/components/tags-input/use-tags-input.ts`, `packages/react/src/components/tags-input/tags-input-hidden-input.tsx` | `packages/angular/tags-input/use-tags-input.ts`, `packages/angular/tags-input/tags-input-hidden-input.ts` | Field control ID is mapped to `hiddenInput` and `aria-describedby` is forwarded to the hidden input. Verified by `merges Field disabled/invalid/readOnly state and IDs into the tags input api` spec. |
| Story parity | Earlier Angular Storybook only had `Basic`, `Controlled`, `MaxTags`, `WithField`, and `RootProvider`. | `packages/react/src/components/tags-input/tags-input.stories.tsx` | `packages/angular/tags-input/tags-input.stories.ts` | Angular stories now cover every React story except `WithCombobox` (`AllowDuplicates`, `Basic`, `BlurBehavior`, `Controlled`, `ControlledInputValue`, `Delimiter`, `Disabled`, `DisabledEditing`, `Invalid`, `MaxTagLength`, `MaxWithOverflow`, `PasteBehavior`, `ProgrammaticControl`, `Readonly`, `RootProvider`, `SanitizeValue`, `Validation`, `WithField`). |
| Styling parity | Angular example styles previously used pill chips and missed React CSS states for focused, invalid, disabled, highlighted, clear trigger, and item input. | `.storybook/modules/tags-input.module.css` | `packages/angular/tags-input/tags-input-example-styles.ts` | Angular example styles mirror the React module: control layout/min-height/focus-within/disabled/invalid states, item preview highlight state, item input chip styling, hidden clear trigger positioning, and input placeholder color all match. |
| Story parity | `WithCombobox` is not represented in Angular. | `packages/react/src/components/tags-input/examples/with-combobox.tsx` | `packages/angular/tags-input/tags-input.stories.ts` | Deferred. Composing two `applyArkProps`-driven directives on one `<input>` is not supported by the documented Angular adapter primitives; needs an explicit cross-primitive composition pattern. |

## Implementation Plan
1. Re-audit React reference against current Angular implementation to confirm earlier fixes still hold.
2. Compare exported types, directive APIs, outputs, example IDs, story names, and demo CSS module selectors line by line.
3. Re-run component specs and Angular typecheck path scoped to the tags-input source files; verify no regressions.
4. Update the audit file to reflect re-audit findings and the still-deferred `WithCombobox` example.

## Verification
- [x] Typecheck/build: `bunx tsc -p packages/angular/tsconfig.spec.json --noEmit --pretty false` reports no tags-input errors. Repo-wide `bun run --cwd packages/angular typecheck` currently fails inside `navigation-menu/navigation-menu.spec.ts` (TS4111 on `Property 'id' comes from an index signature`), which is unrelated to tags-input and out of scope for this audit.
- [x] Component tests: `bun run --cwd packages/angular test:ci tags-input/tags-input.spec.ts` passed with 16 tests.
- [ ] Storybook render: not re-run during this re-audit; previous audit confirmed `bun run --cwd packages/angular storybook -- --smoke-test` succeeded and the story/example diff vs React shows only `WithCombobox` missing.
- [ ] Manual/visual checks: not re-run; styles cross-checked against `.storybook/modules/tags-input.module.css` by source inspection.

## Commit
- Hash: 3b04d1c9a (original parity fix); re-audit commit hash recorded after this update.
- Message: `fix(angular): align tags-input with react parity`
