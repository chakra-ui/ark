# Swap Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/swap/swap.ts`, `packages/angular/src/swap/public-api.ts`, `packages/angular/src/swap/swap.stories.ts`, `packages/angular/src/swap/examples/*.ts`, `packages/angular/src/swap/swap.spec.ts`, `packages/angular/src/anatomy.ts`
- React files: `packages/react/src/components/swap/use-swap.ts`, `packages/react/src/components/swap/swap-root.tsx`, `packages/react/src/components/swap/swap-indicator.tsx`, `packages/react/src/components/swap/swap-root-provider.tsx`, `packages/react/src/components/swap/swap.anatomy.ts`, `packages/react/src/components/swap/swap.stories.tsx`, `packages/react/src/components/swap/examples/*.tsx`
- Storybook/style files: `.storybook/modules/swap.module.css`, `packages/angular/src/swap/examples/*.ts`

## Summary
- Status: Fixed with one deferred API design gap.
- Highest-risk gaps: Angular missed the public `swapAnatomy` export and its Storybook demos used a different title, text content, and transition-only styles instead of the React icon demos and animation selectors.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `swapAnatomy` was not exported from the component entry point or root anatomy barrel. | `packages/react/src/components/swap/swap.anatomy.ts`, `packages/react/src/components/swap/index.ts` | `packages/angular/src/swap/public-api.ts`, `packages/angular/src/anatomy.ts` | Add `swap.anatomy.ts`, export it from `@ark-ui/angular/swap`, and include it in the root anatomy barrel. |
| Story parity | Angular story title was `Utilities / Swap`; React uses `Components / Swap`. | `packages/react/src/components/swap/swap.stories.tsx` | `packages/angular/src/swap/swap.stories.ts` | Move Angular story title to `Components / Swap`. |
| Demo content | Angular demos rendered text labels; React demos render icon-only swap buttons. | `packages/react/src/components/swap/examples/*.tsx` | `packages/angular/src/swap/examples/*.ts` | Add local SVG icon components and update all swap examples to render icon pairs with accessible button labels. |
| Styling parity | Angular demos used bespoke min-width text styles and opacity/transition rules, missing React CSS module animations, focus ring, sizing, and `data-state` animation selectors. | `.storybook/modules/swap.module.css` | `packages/angular/src/swap/examples/*.ts` | Add shared `swapExampleStyles` mirroring React demo CSS and use it across examples. |
| Functionality | Core controlled `swap`, `lazyMount`, and `unmountOnExit` behavior already follows React's `useSwap` behavior through Angular `ArkPresenceComponent`. | `packages/react/src/components/swap/use-swap.ts` | `packages/angular/src/swap/swap.ts`, `packages/angular/src/swap/swap.spec.ts` | No change. Existing specs cover controlled state, presence swapping, and unmount-on-exit. |
| Accessibility | React icon buttons have visible icons but no explicit label. Angular examples should preserve an accessible name after switching to icons. | `packages/react/src/components/swap/examples/*.tsx` | `packages/angular/src/swap/examples/*.ts` | Add `aria-label` per example button while keeping `aria-pressed`. |
| Root provider | React exports `SwapRootProvider` and `useSwap`; Angular currently exposes the root component and indicators only. | `packages/react/src/components/swap/swap-root-provider.tsx`, `packages/react/src/components/swap/use-swap.ts` | `packages/angular/src/swap/swap.ts`, `packages/angular/src/swap/public-api.ts` | Deferred. This component is implemented as a lightweight Angular component around presence rather than a Zag machine hook; adding a provider/hook should be designed consistently with Angular non-machine utilities. |

## Implementation Plan
1. Add Angular swap anatomy and export it through the component and root anatomy barrels.
2. Add shared demo styles matching `.storybook/modules/swap.module.css`.
3. Add local SVG icon components matching the React examples' icon-only demos.
4. Update fade, flip, rotate, and scale examples to use shared styles and icon content.
5. Align Storybook title and add focused tests for public API and example components.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The build emitted existing package export-condition warnings and `forms isolation: ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/swap/swap.spec.ts` passed with 1 file and 10 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007 --ci` reached `Storybook ready!` at `http://localhost:6007/`; stopped manually with Ctrl-C after startup.
- [x] Manual/visual checks: Compared React swap examples and `.storybook/modules/swap.module.css` against Angular examples. Angular now uses icon-only Fade, Flip, Rotate, and Scale demos with matching animation class names, `data-state` selectors, root perspective on Flip, and accessible button labels.

## Commit
- Hash:
- Message: `fix(angular): align swap with react parity`
