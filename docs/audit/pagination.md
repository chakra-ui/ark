# Pagination Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/pagination/`
- React files: `packages/react/src/components/pagination/`
- Storybook/style files: `packages/angular/src/pagination/pagination.stories.ts`, `packages/angular/src/pagination/examples/`, `packages/angular/src/pagination/pagination-example-styles.ts`, `.storybook/modules/pagination.module.css`

## Summary
- Status: Fixed; Storybook render is blocked by an unrelated `number-input` TypeScript error.
- Highest-risk gaps: Angular Storybook lacked five React parity examples (`Context`, `Customized`, `DataSlicing`, `Link`, `PageRange`), and demo styles did not fully match React hover, focus, selected, select, grid, and layout states.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `Context` story demonstrating direct context API navigation. | `packages/react/src/components/pagination/examples/context.tsx` | `packages/angular/src/pagination/pagination.stories.ts` | Add `examples/context.ts` and story export. |
| Story parity | Missing `Customized` story demonstrating translations. | `packages/react/src/components/pagination/examples/customized.tsx` | `packages/angular/src/pagination/pagination.stories.ts` | Add `examples/customized.ts` and story export. |
| Story parity | Missing `DataSlicing` story demonstrating `api.slice()`. | `packages/react/src/components/pagination/examples/data-slicing.tsx` | `packages/angular/src/pagination/pagination.stories.ts` | Add `examples/data-slicing.ts` and story export. |
| Story parity | Missing `Link` story demonstrating `type="link"` and `getPageUrl`. | `packages/react/src/components/pagination/examples/link.tsx` | `packages/angular/src/pagination/pagination.stories.ts` | Add `examples/link.ts` and story export. |
| Story parity | Missing `PageRange` story demonstrating `pageRange`, `count`, and `totalPages`. | `packages/react/src/components/pagination/examples/page-range.tsx` | `packages/angular/src/pagination/pagination.stories.ts` | Add `examples/page-range.ts` and story export. |
| Styling parity | Angular demo styles used fixed widths and lacked React hover, selected hover, focus-visible, select, grid, max-width, and SVG sizing rules. | `.storybook/modules/pagination.module.css` | `packages/angular/src/pagination/pagination-example-styles.ts` | Align Angular classes with React module behavior using existing Angular class names. |
| Functionality parity | Root, root-provider, item, ellipsis, first/prev/next/last triggers, controlled `page`, controlled `pageSize`, generated ids, disabled boundary triggers, context helper, exports, and anatomy are implemented and tested. | `packages/react/src/components/pagination/` | `packages/angular/src/pagination/` | No implementation change. |
| Public API parity | React `Pagination.Item` accepts Zag `ItemProps` including `type`; Angular item directive requires `value` and always passes `{ type: 'page', value }`. The current Zag pagination pages only render page items through this directive; link mode is controlled by root `type`. | `packages/react/src/components/pagination/pagination-item.tsx` | `packages/angular/src/pagination/pagination-item.ts` | No change; Angular directive API remains value-centric for page items. |

## Implementation Plan
1. Add missing Angular examples for React story parity.
2. Update pagination stories to export all React-equivalent examples.
3. Align Angular demo styles with the React pagination CSS module.
4. Add focused link-mode coverage for generated pagination hrefs.
5. Verify pagination specs, formatting, Storybook compile, typecheck, and diff hygiene.

## Verification
- [x] Formatting: `bunx prettier --check packages/angular/src/pagination docs/audit/pagination.md` passed.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/pagination/pagination.spec.ts` passed, 9 tests.
- [x] Diff hygiene: `git diff --check -- packages/angular/src/pagination docs/audit/pagination.md` passed.
- [ ] Typecheck/build: `bun run --cwd packages/angular typecheck` failed outside pagination at `number-input/use-number-input.ts:53:9` with TS1117 duplicate `locale` property.
- [ ] Storybook render: `bun run --cwd packages/angular storybook -- --ci --port 6011` failed outside pagination at `number-input/use-number-input.ts:53:9` with TS1117 duplicate `locale` property.
- [ ] Manual/visual checks: Deferred because Storybook preview cannot compile until the unrelated `number-input` TypeScript error is fixed.

## Commit
- Hash:
- Message: `fix(angular): align pagination with react parity`
