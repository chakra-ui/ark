# Scroll Area Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/scroll-area/`
- React files: `packages/react/src/components/scroll-area/`
- Storybook/style files: `packages/angular/src/scroll-area/scroll-area.stories.ts`, `packages/angular/src/scroll-area/examples/`, `packages/angular/src/scroll-area/scroll-area-example-styles.ts`, `.storybook/modules/scroll-area.module.css`

## Summary
- Status: Fixed. Core directives, root provider, Zag machine wiring, scrollbar orientation context, DOM measurement setup, SSR guard, public context carrier, and the five React stories exist in Angular.
- Highest-risk gaps: Closed for public context parity and Storybook style parity. Full package typecheck remains blocked by an unrelated `select/select.spec.ts` error.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | React exports `ScrollArea.Context` and `ScrollAreaContext`; Angular exposed only the injection helper, so templates had no context carrier. | `packages/react/src/components/scroll-area/scroll-area-context.tsx`, `packages/react/src/components/scroll-area/index.ts` | `packages/angular/src/scroll-area/public-api.ts` | Add `ArkScrollAreaContext` structural directive, export it, and cover it in specs. |
| Storybook styling parity | Angular examples used older dimensions, padding, border, scrollbar sizing, and visibility styles that did not match the React CSS module. | `.storybook/modules/scroll-area.module.css` | `packages/angular/src/scroll-area/scroll-area-example-styles.ts`, `packages/angular/src/scroll-area/examples/*.ts` | Align Angular class styles and story sizing/content with the React demos. |
| Story parity | React stories are `Basic`, `BothDirections`, `Horizontal`, `Nested`, and `RootProvider`; Angular already has the same story names. | `packages/react/src/components/scroll-area/scroll-area.stories.tsx` | `packages/angular/src/scroll-area/scroll-area.stories.ts` | No change. |
| Functionality parity | Root/root-provider apply root props, descendants apply Zag props, scrollbar passes orientation to thumb, and root setup measures overflow and wheel interactions. | `packages/react/src/components/scroll-area/*.tsx`, `@zag-js/scroll-area` | `packages/angular/src/scroll-area/*.ts` | No change. |
| Accessibility parity | Zag applies roles, owned-by links, focusable viewport when both axes overflow, and scroll interaction handlers. | `packages/angular/node_modules/@zag-js/scroll-area/src/scroll-area.connect.ts` | `packages/angular/src/scroll-area/*.ts` | No change. |
| Test parity | Angular covered public exports, DOM attributes, contexts, nested roots, SSR, cleanup, and root provider but not the context carrier. | React source/API surface | `packages/angular/src/scroll-area/scroll-area.spec.ts` | Add context directive public surface and render/update coverage. |

## Implementation Plan
1. Add `ArkScrollAreaContext` as a structural directive with typed `$implicit` and `api` template context.
2. Export the context directive and template type from the scroll-area public API.
3. Update Angular examples/styles to visually match the React scroll-area module.
4. Extend scroll-area specs for public surface and context rendering.
5. Run focused tests, typecheck, and diff checks.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; fails before scroll-area on existing `select/select.spec.ts(541,34): Property 'getSnapshot' does not exist on type 'SelectService<any>'`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/scroll-area/scroll-area.spec.ts` passed, 1 file and 9 tests.
- [ ] Storybook render: Not run; no browser visual pass was performed in this audit turn.
- [x] Manual/visual checks: Static comparison against `.storybook/modules/scroll-area.module.css` completed; Angular examples now match React dimensions, content spacing, scrollbar visibility, thumb sizing, story heights, and root-provider button labels.

## Commit
- Hash:
- Message: `fix(angular): align scroll-area with react parity`
