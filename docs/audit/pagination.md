# Pagination Angular Parity Audit

## Scope

- Angular files: `packages/angular/src/pagination/`
- React files: `packages/react/src/components/pagination/`
- Storybook/style files: `packages/angular/src/pagination/pagination.stories.ts`,
  `packages/angular/src/pagination/examples/`, `packages/angular/src/pagination/pagination-example-styles.ts`,
  `.storybook/modules/pagination.module.css`

## Summary

- Status: Re-audited. Public API, stories, examples, demo styles, exports, anatomy, and specs match React parity. No new
  fixes were required on this pass; the previous `number-input` TypeScript blocker no longer reproduces and
  typecheck/build pass cleanly. Storybook static build fails at the framework level due to an unrelated legacy
  `@storybook/angular` builder migration, not anything in pagination.
- Highest-risk gaps: None outstanding for pagination.

## Gap Matrix

| Area              | Gap                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | React reference                                                         | Angular location                                               | Fix                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Story parity      | All ten React stories (`Basic`, `Context`, `Controlled`, `Customized`, `DataSlicing`, `Link`, `PageRange`, `PageSizeControl`, `RootProvider`, `WithEdges`) have matching Angular `StoryObj` exports and example components.                                                                                                                                                                                                                                                                                                                     | `packages/react/src/components/pagination/pagination.stories.tsx`       | `packages/angular/src/pagination/pagination.stories.ts`        | No change.                                                                                                             |
| Example parity    | Every Angular example mirrors its React counterpart for count, pageSize, siblingCount, translations, data slicing, link/`getPageUrl`, page-range derivations, and root-provider composition. Controlled mode uses `[(page)]` (banana syntax) per tech requirements §3.                                                                                                                                                                                                                                                                          | `packages/react/src/components/pagination/examples/*.tsx`               | `packages/angular/src/pagination/examples/*.ts`                | No change.                                                                                                             |
| Styling parity    | Angular demo styles cover root, controls, item, trigger, ellipsis, focus-visible, selected (+ hover), disabled, page-size select, stack, grid, grid-item, page-count, and SVG sizing — same rules as the React CSS module.                                                                                                                                                                                                                                                                                                                      | `.storybook/modules/pagination.module.css`                              | `packages/angular/src/pagination/pagination-example-styles.ts` | No change.                                                                                                             |
| Public API parity | Root inputs: `id`, `ids`, `count`, `page` (model), `defaultPage`, `pageSize` (model), `defaultPageSize`, `siblingCount`, `boundaryCount`, `type`, `getPageUrl`, `translations`. Outputs: model-derived `pageChange`/`pageSizeChange` plus explicit `pageDetailsChange`/`pageSizeDetailsChange` for full Zag details — the same dual-output pattern used by carousel and steps.                                                                                                                                                                  | `packages/react/src/components/pagination/pagination-root.tsx`          | `packages/angular/src/pagination/pagination-root.ts`           | No change.                                                                                                             |
| Public API parity | Angular `[arkPaginationItem]` requires a numeric `value` and always passes `{ type: 'page', value }` to Zag. React `Pagination.Item` accepts the full Zag `ItemProps` (including `type`), but Zag's pagination machine only produces `type: 'page'` entries through `pagination.pages`. Link mode is controlled by root `type` and `getPageUrl`.                                                                                                                                                                                                | `packages/react/src/components/pagination/pagination-item.tsx`          | `packages/angular/src/pagination/pagination-item.ts`           | No change; the value-centric directive API is idiomatic for the framework and matches the only Zag-emitted item shape. |
| Public API parity | Root-provider directive (`[arkPaginationRootProvider]`) accepts `value: UsePaginationReturn`, re-exposes state/api/send/service, and re-provides itself through DI on the same `ARK_PAGINATION_CONTEXT` token used by the root directive.                                                                                                                                                                                                                                                                                                       | `packages/react/src/components/pagination/pagination-root-provider.tsx` | `packages/angular/src/pagination/pagination-root-provider.ts`  | No change.                                                                                                             |
| Slot parity       | Render-prop access to the live `api()` signal is delivered through the `*arkPaginationContext` structural directive (`<ng-container *arkPaginationContext="let pagination">{{ pagination().page }}</ng-container>`), matching tech requirements §5 (TemplateRef + injector-aware view). Consumers may also use `#root="arkPagination"` and read `root.api()` directly.                                                                                                                                                                          | `packages/react/src/components/pagination/pagination-context.tsx`       | `packages/angular/src/pagination/pagination-context.ts`        | No change.                                                                                                             |
| Public exports    | `paginationAnatomy`, `usePagination`, `ARK_PAGINATION_CONTEXT`, `injectArkPaginationContext`, every directive, and the full Zag type re-export set (`PaginationApi`, `PaginationElementIds`, `PaginationEllipsisMachineProps`, `PaginationIntlTranslations`, `PaginationItemLabelDetails`, `PaginationItemMachineProps`, `PaginationMachine`, `PaginationMachineProps`, `PaginationPageChangeDetails`, `PaginationPageSizeChangeDetails`, `PaginationPageUrlDetails`, `PaginationPages`, `PaginationService`) are exported via `public-api.ts`. | `packages/react/src/components/pagination/index.ts`                     | `packages/angular/src/pagination/public-api.ts`                | No change.                                                                                                             |
| Test parity       | Angular specs cover: documented public surface, fallback `usePagination` id, item/ellipsis attributes, first/prev/next/last triggers, controlled `[(page)]` single-emission, derived state on count/pageSize change, boundary disabled state on first/last page, root-provider composition, and link-mode generated `href` values.                                                                                                                                                                                                              | `packages/react/src/components/pagination/tests/pagination.test.tsx`    | `packages/angular/src/pagination/pagination.spec.ts`           | No change.                                                                                                             |

## Implementation Plan

1. Re-run parity comparison across stories, examples, styles, public API, exports, types, anatomy, and tests.
2. Verify pagination specs, formatting, typecheck/build, and diff hygiene.
3. Record the unrelated Storybook framework migration error as a deferred gap.
4. Commit the audit refresh.

## Verification

- [x] Formatting: `bunx prettier --check packages/angular/src/pagination docs/audit/pagination.md` passed.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/pagination/pagination.spec.ts` passed, 9 tests in 1
      file.
- [x] Diff hygiene: `git diff --check -- packages/angular/src/pagination docs/audit/pagination.md` clean.
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` succeeded for every entry point including
      `pagination`; the previously reported `number-input/use-number-input.ts` TS1117 error no longer reproduces. Forms
      isolation check also passed.
- [ ] Storybook render: `bunx --cwd packages/angular storybook build` fails at framework level with "Storybook 10 drops
      support for calling storybook directly … please run `npx storybook automigrate`" originating from
      `@storybook/angular`'s legacy build option check. Not pagination-specific; affects all stories until the workspace
      adopts the new Angular Storybook builder.
- [ ] Manual/visual checks: Deferred for the same Storybook framework migration reason. Pagination examples themselves
      are unchanged from the previous fix pass.

## Commit

- Hash: `02fc46dc1`
- Message: `fix(angular): align pagination with react parity`
