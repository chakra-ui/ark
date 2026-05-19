# Listbox Angular Parity Audit

## Scope
- Angular files: `packages/angular/listbox/`
- React files: `packages/react/src/components/listbox/`
- Storybook/style files: `packages/angular/listbox/listbox.stories.ts`, `packages/angular/listbox/examples/`, `packages/angular/listbox/listbox-example-styles.ts`, `.storybook/modules/listbox.module.css`

## Summary
- Status: Fixed with deferred visual inspection.
- Highest-risk gaps: Angular Storybook coverage missed most React listbox examples; Angular demo styles did not match the React module for horizontal card, grid, grouped, value-text, empty, and select-all states; `arkListboxEmpty` used status semantics while React renders the empty placeholder as presentation.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `Controlled`, `DisabledItem`, `ExtendedSelect`, `Filtering`, `Grid`, `Group`, `Horizontal`, `SelectAll`, and `ValueText` stories. | `packages/react/src/components/listbox/listbox.stories.tsx` | `packages/angular/listbox/listbox.stories.ts` | Add matching Angular examples and story exports. |
| Styling parity | Angular example styles only covered the basic vertical list and missed React layout, scroll, selected, empty, grid, group, card, and select-all selectors. | `.storybook/modules/listbox.module.css` | `packages/angular/listbox/listbox-example-styles.ts` | Expand Angular attribute/class selectors to mirror the React module. |
| Accessibility parity | Empty placeholder uses `role="status"`; React renders it with `role="presentation"`. | `packages/react/src/components/listbox/listbox-empty.tsx` | `packages/angular/listbox/listbox-empty.ts` | Change Angular empty role to `presentation` and update spec. |
| Story parity | Root provider demo did not include the external button that drives `setValue(['high'])`. | `packages/react/src/components/listbox/examples/root-provider.tsx` | `packages/angular/listbox/examples/root-provider.ts` | Add a button that calls the listbox API. |
| Test parity | Angular tests covered selection, model roundtrip, empty visibility, and public exports, but lacked disabled item attributes and output payload checks that React covers. | `packages/react/src/components/listbox/listbox.test.tsx` | `packages/angular/listbox/listbox.spec.ts` | Add focused disabled item and output detail tests. |

## Implementation Plan
1. Align empty placeholder semantics with React.
2. Add the missing Angular listbox examples and export matching stories.
3. Expand the shared Angular example styles to cover the React demo states.
4. Add narrow specs for disabled item attributes and selection output payloads.
5. Run listbox specs, typecheck, diff checks, then update this audit with results and commit metadata.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted, blocked by unrelated existing `packages/angular/number-input/use-number-input.ts:53:9` duplicate `locale` property (`TS1117`) before listbox-specific completion.
- [x] Component tests: `bun run --cwd packages/angular test:ci listbox/listbox.spec.ts` passed; 1 file, 14 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --ci --port 6007` attempted, preview build blocked by the same unrelated `packages/angular/number-input/use-number-input.ts:53:9` duplicate `locale` property.
- [ ] Manual/visual checks: Deferred because Storybook did not build due to the unrelated number-input TypeScript error.

## Commit
- Hash: Pending commit.
- Message: `fix(angular): align listbox with react parity`
