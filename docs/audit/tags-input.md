# Tags Input Angular Parity Audit

## Scope
- Angular files: `packages/angular/tags-input/`
- React files: `packages/react/src/components/tags-input/`
- Storybook/style files: `packages/angular/tags-input/tags-input.stories.ts`, `packages/angular/tags-input/tags-input-example-styles.ts`, `.storybook/modules/tags-input.module.css`

## Summary
- Status: Fixed the Angular directive API, field integration, demo styling, tests, and most Storybook parity gaps for `tags-input`.
- Highest-risk gaps: `WithCombobox` remains deferred because the React demo composes `Combobox.Input asChild` with `TagsInput.Input`; the Angular package needs an explicit cross-primitive composition pattern before this can be represented without ad hoc behavior.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `TagsInput.Item` accepted `index` and `value` only, while React item props also include `disabled`. | `packages/react/src/components/tags-input/tags-input-item.tsx` | `packages/angular/tags-input/tags-input-item.ts` | Added a boolean `disabled` input and carried it through item descendant prop calls. |
| Public API | Root did not expose outputs for non-model Zag callbacks. | `packages/react/src/components/tags-input/tags-input-root.tsx` | `packages/angular/tags-input/tags-input-root.ts` | Added `highlightChange`, `valueInvalid`, `focusOutside`, `pointerDownOutside`, and `interactOutside` outputs, plus public event type exports. |
| Field/accessibility | Field IDs targeted the visible input instead of the hidden input and hidden input missed field `aria-describedby`. | `packages/react/src/components/tags-input/use-tags-input.ts`, `packages/react/src/components/tags-input/tags-input-hidden-input.tsx` | `packages/angular/tags-input/use-tags-input.ts`, `packages/angular/tags-input/tags-input-hidden-input.ts` | Mapped field control ID to `hiddenInput` and added field described-by propagation. |
| Story parity | Angular only had `Basic`, `Controlled`, `MaxTags`, `WithField`, and `RootProvider`. | `packages/react/src/components/tags-input/tags-input.stories.tsx` | `packages/angular/tags-input/tags-input.stories.ts` | Added Angular stories/examples for duplicates, blur behavior, controlled input value, delimiter, disabled, disabled editing, invalid, max length, max with overflow, paste behavior, programmatic control, readonly, sanitize value, and validation. |
| Styling parity | Angular example styles used pill chips and missed React CSS states for focused, invalid, disabled, highlighted, clear trigger, and item input. | `.storybook/modules/tags-input.module.css` | `packages/angular/tags-input/tags-input-example-styles.ts` | Reworked Storybook styles to mirror the React module selectors and states using Angular attribute selectors. |
| Story parity | `WithCombobox` is not represented in Angular. | `packages/react/src/components/tags-input/examples/with-combobox.tsx` | `packages/angular/tags-input/tags-input.stories.ts` | Deferred. Angular needs a documented equivalent to React `asChild` composition between combobox input and tags-input input. |

## Implementation Plan
1. Align the Angular directive and public type surface with React/Zag callback and item prop support.
2. Bring field integration into parity with React hidden-input ownership and described-by behavior.
3. Add focused tests for outputs, field hidden input wiring, and item disabled input support.
4. Expand Angular Storybook examples and styles to cover the React demo matrix where Angular composition supports it.
5. Verify with the component spec, TypeScript, and diff checks.

## Verification
- [x] Typecheck/build: `bunx tsc -p packages/angular/tsconfig.spec.json --noEmit --pretty false` passed. `bun run --cwd packages/angular typecheck` passed, including the Angular production build and forms-isolation check.
- [x] Component tests: `bun run --cwd packages/angular test:ci tags-input/tags-input.spec.ts` passed with 16 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --smoke-test` passed with existing unused-file and `DefinePlugin` warnings.
- [ ] Manual/visual checks: No browser side-by-side inspection; styles were compared against `.storybook/modules/tags-input.module.css` by source inspection.

## Commit
- Hash: Recorded in final response after commit.
- Message: `fix(angular): align tags-input with react parity`
