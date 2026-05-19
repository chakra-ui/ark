# Scroll Area Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/scroll-area/`
  - `scroll-area-root.ts`, `scroll-area-root-provider.ts`, `scroll-area-viewport.ts`, `scroll-area-content.ts`,
    `scroll-area-scrollbar.ts`, `scroll-area-thumb.ts`, `scroll-area-corner.ts`, `scroll-area-context.ts`,
    `scroll-area-setup.ts`, `use-scroll-area.ts`, `use-scroll-area-context.ts`,
    `use-scroll-area-scrollbar-context.ts`, `scroll-area.types.ts`, `scroll-area.anatomy.ts`, `public-api.ts`
  - Examples: `packages/angular/src/scroll-area/examples/basic.ts`, `both-directions.ts`, `horizontal.ts`,
    `nested.ts`, `root-provider.ts`
  - Stories/styles: `packages/angular/src/scroll-area/scroll-area.stories.ts`,
    `packages/angular/src/scroll-area/scroll-area-example-styles.ts`
  - Tests: `packages/angular/src/scroll-area/scroll-area.spec.ts`
- React files: `packages/react/src/components/scroll-area/`
  - `scroll-area-root.tsx`, `scroll-area-root-provider.tsx`, `scroll-area-viewport.tsx`, `scroll-area-content.tsx`,
    `scroll-area-scrollbar.tsx`, `scroll-area-thumb.tsx`, `scroll-area-corner.tsx`, `scroll-area-context.tsx`,
    `use-scroll-area.ts`, `use-scroll-area-context.ts`, `use-scroll-area-scrollbar-context.ts`,
    `scroll-area.anatomy.ts`, `scroll-area.ts`, `index.ts`
  - Examples: `basic.tsx`, `both-directions.tsx`, `horizontal.tsx`, `nested.tsx`, `root-provider.tsx`
  - Stories: `scroll-area.stories.tsx`
- Storybook/style files: `.storybook/modules/scroll-area.module.css`, `packages/angular/src/scroll-area/scroll-area-example-styles.ts`
- Package wiring: `packages/angular/package.json` (`./scroll-area` export entry)

## Summary
- Status: Re-audited; no new gaps. All React parts have Angular directive counterparts. Anatomy, public API,
  context carriers, story names, example sources, styling rules, SSR-guarded DOM setup, and cleanup are aligned with
  the React reference. The full set of scroll-area specs continues to pass under zoneless change detection.
- Highest-risk gaps: None remaining for scroll-area. The package-wide `typecheck` script is still blocked by an
  unrelated failure outside scroll-area scope (currently `navigation-menu.spec.ts(124,73)` index-signature
  error TS4111). Scroll-area sources, examples, and spec compile cleanly under the spec tsconfig.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Angular exposes anatomy, all directives, machine types, root/scrollbar context tokens with `inject*` helpers, `useScrollArea`, and the `ArkScrollAreaContext` structural directive matching React's `ScrollArea.Context`. | `packages/react/src/components/scroll-area/index.ts`, `scroll-area.ts`, `scroll-area-context.tsx` | `packages/angular/src/scroll-area/public-api.ts`, `scroll-area-context.ts` | No change. |
| Story parity | React stories are `Basic`, `BothDirections`, `Horizontal`, `Nested`, `RootProvider`; Angular registers the same five exports through the example registry. | `packages/react/src/components/scroll-area/scroll-area.stories.tsx` | `packages/angular/src/scroll-area/scroll-area.stories.ts` | No change. |
| Example parity | All five examples mirror React content, dimensions, orientation usage, and root-provider scroll-to-edge actions. | `packages/react/src/components/scroll-area/examples/*.tsx` | `packages/angular/src/scroll-area/examples/*.ts` | No change. |
| Functionality parity | Root + Root-Provider apply root props, descendants apply Zag props for viewport/content/scrollbar/thumb/corner; scrollbar passes orientation to thumb via DI scrollbar context; setup measures content/viewport via ResizeObserver/IntersectionObserver, attaches passive-false wheel listeners per orientation, and tears down on destroy. SSR-safe via `afterNextRender`. | `packages/react/src/components/scroll-area/*.tsx`, `@zag-js/scroll-area` | `packages/angular/src/scroll-area/scroll-area-root.ts`, `scroll-area-root-provider.ts`, `scroll-area-scrollbar.ts`, `scroll-area-setup.ts` | No change. |
| Accessibility parity | Zag emits `role="presentation"` on root, `aria-owns` style `data-ownedby`, `tabindex` and focusable viewport on both-axes overflow, and scroll interaction handlers. `applyArkProps` writes them as DOM attributes per technical requirements. | `node_modules/@zag-js/scroll-area/.../scroll-area.connect.ts` | `packages/angular/src/scroll-area/*.ts` via `applyArkProps` | No change. |
| Styling parity | Angular example styles mirror React's CSS module rules: root sizing, viewport outline + focus-visible state, content padding, scrollbar opacity transitions and data-state visibility, thumb sizing per orientation, transparent corner. Root-provider story has matching action button block. | `.storybook/modules/scroll-area.module.css` | `packages/angular/src/scroll-area/scroll-area-example-styles.ts`, examples | No change. |
| Test parity | Angular spec covers public surface, fallback id generation, all part data attributes, vertical/horizontal scrollbar context, nested root isolation, server-platform construction, observer + wheel-listener cleanup on destroy, root-provider attribute propagation, and the structural context directive rendering against the current `api` signal. | React stories/source surface | `packages/angular/src/scroll-area/scroll-area.spec.ts` | No change. |

## Implementation Plan
1. Re-confirm the inventory and parity (done in this re-audit pass).
2. Re-run the focused spec to confirm continued green: `bun run --cwd packages/angular test:ci src/scroll-area/scroll-area.spec.ts`.
3. Update the audit file with re-audit findings and the new commit hash.
4. No source/example/style changes required.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/scroll-area/scroll-area.spec.ts` — 1 file, 9 tests passed.
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; fails outside scroll-area on
      `src/navigation-menu/navigation-menu.spec.ts(124,73): error TS4111`. Scroll-area sources/tests are unaffected.
- [ ] Storybook render: Not run; no browser visual pass performed in this audit turn.
- [x] Manual/visual checks: Static comparison against `.storybook/modules/scroll-area.module.css` continues to match
      Angular's `scroll-area-example-styles.ts` for layout, scrollbar opacity transitions, orientation-specific
      sizing, and thumb rules; example dimensions match each React example.

## Commit
- Hash: 1de8d29ca
- Message: `fix(angular): align scroll-area with react parity`
