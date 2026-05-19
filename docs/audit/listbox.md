# Listbox Angular Parity Audit

## Scope
- Angular files: `packages/angular/listbox/`
- React files: `packages/react/src/components/listbox/`
- Storybook/style files: `packages/angular/listbox/listbox.stories.ts`, `packages/angular/listbox/examples/`, `packages/angular/listbox/listbox-example-styles.ts`, `.storybook/modules/listbox.module.css`

## Summary
- Status: Re-audited. Prior gaps remain closed; small follow-up parity work applied.
- Highest-risk gaps (this pass): public `SelectionMode` re-export missing; SelectAll demo invoked `arkListboxLabel` inside a clickable button which double-wires Zag label click semantics onto a custom toggle.

## Prior Gaps Confirmed Closed
- Story parity: all 12 React stories present in Angular (`Basic`, `Controlled`, `DisabledItem`, `ExtendedSelect`, `Filtering`, `Grid`, `Group`, `Horizontal`, `Multiple`, `RootProvider`, `SelectAll`, `ValueText`), plus Angular-only `Empty` and `WithField`.
- Styling parity: `listbox-example-styles.ts` mirrors React `.storybook/modules/listbox.module.css` for layout, scroll, selected, empty, grid, group, card, and select-all states (attribute-selector and class-selector equivalents).
- Empty semantics: `[arkListboxEmpty]` renders `role="presentation"` and toggles `display: none` when the collection is non-empty; matches React's "render null when items exist" behavior at the visible-DOM level.
- Root-provider demo: external `Set to High` button drives `listbox.api().setValue(['high'])`.
- Test parity: disabled item attributes (`aria-disabled`), `valueChange` + `select` output detail payloads, controlled `[(value)]` and `[(highlightedValue)]` roundtrips, empty visibility, missing-provider guards, public-surface smoke, and `@angular/forms` isolation are covered.

## Gap Matrix (this pass)
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | React `listbox.ts` re-exports `SelectionMode`; Angular omitted the type from the public entry. | `packages/react/src/components/listbox/listbox.ts` (`export type … SelectionMode`) | `packages/angular/listbox/listbox.types.ts`, `packages/angular/listbox/public-api.ts` | Re-export `SelectionMode` as `ListboxSelectionMode` and include in spec smoke. |
| Story parity | `SelectAll` example wrapped the "Select All" caption in `[arkListboxLabel]` inside a `<button>` — Zag's label click handler then competes with the custom toggle. React uses a plain `styles.Label` span. | `packages/react/src/components/listbox/examples/select-all.tsx` | `packages/angular/listbox/examples/select-all.ts`, `packages/angular/listbox/listbox-example-styles.ts` | Replace `arkListboxLabel` with a presentational `select-all-header-label` span; add matching demo style. |
| Demo styling | `[arkListboxItem]` sets `cursor: pointer`/`cursor: not-allowed`; React omits cursor on `.Item`. | `.storybook/modules/listbox.module.css` `.Item` | `listbox-example-styles.ts` `[arkListboxItem]` | No change — Angular keeps the pointer cursor as an intentional usability improvement on a `<div>` host; documented divergence. |

## Implementation Plan
1. Re-export `SelectionMode` (`as ListboxSelectionMode`) from `listbox.types.ts` and `public-api.ts`; extend spec type smoke.
2. Fix the SelectAll example to use a plain styled span instead of the label part; add `.select-all-header-label` rule mirroring the React label styling.
3. Run listbox spec and typecheck; record the unrelated repo-wide `check:forms-isolation` failure as out-of-scope.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci listbox/listbox.spec.ts` — 1 file, 14 tests passed.
- [x] Typecheck/build (listbox entry): `bun run --cwd packages/angular typecheck` builds `@ark-ui/angular/src/listbox` successfully. The overall command exits non-zero because the repo-wide `check:forms-isolation` post-step reports missing build artifacts for many other packages (e.g. `tooltip`, `tabs`, `tree-view`) when their dist outputs were not produced in this run. Failure is unrelated to listbox.
- [ ] Storybook render: not re-run this pass; preview build is gated by the same multi-package build state. Listbox stories compile cleanly under the build above.
- [ ] Manual/visual checks: deferred (no browser tooling executed in this session).

## Commit
- Hash: 8240d46a8
- Message: `fix(angular): align listbox with react parity`
