# Swap Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/swap/swap.ts`, `packages/angular/src/swap/public-api.ts`, `packages/angular/src/swap/swap.anatomy.ts`, `packages/angular/src/swap/swap.stories.ts`, `packages/angular/src/swap/swap-example-styles.ts`, `packages/angular/src/swap/examples/*.ts`, `packages/angular/src/swap/swap.spec.ts`, `packages/angular/src/anatomy.ts`
- React files: `packages/react/src/components/swap/use-swap.ts`, `packages/react/src/components/swap/swap-root.tsx`, `packages/react/src/components/swap/swap-indicator.tsx`, `packages/react/src/components/swap/swap-root-provider.tsx`, `packages/react/src/components/swap/swap.anatomy.ts`, `packages/react/src/components/swap/swap.ts`, `packages/react/src/components/swap/swap.stories.tsx`, `packages/react/src/components/swap/examples/*.tsx`, `packages/react/src/components/swap/index.ts`
- Storybook/style files: `.storybook/modules/swap.module.css`, `packages/angular/src/swap/swap-example-styles.ts`

## Summary
- Status: Re-audit confirms parity is in good shape. Public API, anatomy export, story title, icon-only demos, animation classes, focus ring, and accessibility labels match React. One API design gap remains deferred (`SwapRootProvider` / `useSwap` factory).
- Highest-risk gaps: None remain that block parity. The only outstanding item is the deferred `RootProvider`/`useSwap`-style helper, which would require designing a non-machine factory pattern for Angular consistent with the marquee root-provider pattern but adapted to presence-only state.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | `swapAnatomy` was not exported from the component entry point or root anatomy barrel. | `packages/react/src/components/swap/swap.anatomy.ts`, `packages/react/src/components/swap/index.ts` | `packages/angular/src/swap/public-api.ts`, `packages/angular/src/anatomy.ts` | Resolved in prior fix. `swapAnatomy` is exported from `@ark-ui/angular/swap` and the root anatomy barrel. |
| Story parity | Angular story title was `Utilities / Swap`; React uses `Components / Swap`. | `packages/react/src/components/swap/swap.stories.tsx` | `packages/angular/src/swap/swap.stories.ts` | Resolved. Title is `Components / Swap`. |
| Demo content | Angular demos rendered text labels; React demos render icon-only swap buttons. | `packages/react/src/components/swap/examples/*.tsx` | `packages/angular/src/swap/examples/*.ts` | Resolved. Local SVG icon components mirror lucide `Check`, `X`, `Play`, `Pause`, `Sun`, `Moon`, `Volume2`, `VolumeX`. |
| Styling parity | Angular demos used bespoke text styles, missing the React CSS module animations, focus ring, sizing, and `data-state` selectors. | `.storybook/modules/swap.module.css` | `packages/angular/src/swap/swap-example-styles.ts` | Resolved. `swapExampleStyles` mirrors the React module: `.Button`, `.FadeIndicator`, `.FlipIndicator`, `.ScaleIndicator`, `.RotateIndicator`, keyframes for fade/flip/scale/rotate/blur. |
| Functionality | Core controlled `swap`, `lazyMount`, and `unmountOnExit` behavior already follows React's `useSwap` behavior through Angular `ArkPresenceComponent`. | `packages/react/src/components/swap/use-swap.ts` | `packages/angular/src/swap/swap.ts`, `packages/angular/src/swap/swap.spec.ts` | No change. Specs cover controlled state, presence swapping, unmount-on-exit, and orphan-indicator error. |
| Accessibility | React icon buttons have visible icons but no explicit label. Angular examples should preserve an accessible name after switching to icons. | `packages/react/src/components/swap/examples/*.tsx` | `packages/angular/src/swap/examples/*.ts` | Resolved. Each example button has an `aria-label` (`Toggle completion`, `Toggle playback`, `Toggle theme`, `Toggle sound`) and `aria-pressed` reflecting the swap state. Icons are `aria-hidden="true"` and `focusable="false"`. |
| Root provider / hook | React exports `SwapRootProvider` and `useSwap`; Angular exposes the root component and indicators only. | `packages/react/src/components/swap/swap-root-provider.tsx`, `packages/react/src/components/swap/use-swap.ts`, `packages/react/src/components/swap/swap.ts` | `packages/angular/src/swap/swap.ts`, `packages/angular/src/swap/public-api.ts` | Deferred. Swap is a presence-driven utility rather than a Zag machine; adding a provider/hook pattern should be designed consistently with the non-machine helpers and consumed alongside an Angular-specific factory. Out of scope for parity-fix re-audit. |
| Import path style | `swap.ts` imports `ArkPresenceComponent` from `@ark-ui/angular/src/presence` rather than `@ark-ui/angular/presence`. | n/a | `packages/angular/src/swap/swap.ts` | No change. This is the deliberate `src/<name>` alias pattern documented in `packages/angular/src/anatomy.ts` to keep ng-packagr from resolving these as secondary entry points during graph analysis. Other in-`src` components follow the same convention. |
| `exportAs` for root | React components are namespace exports; Angular component-style roots (e.g. `ark-presence`, `ark-portal`) do not declare `exportAs`. | n/a | `packages/angular/src/swap/swap.ts` | No change. `ArkSwapRootComponent` is a Component (element selector), matching the no-`exportAs` convention used for other Component-style primitives in the package. |

## Implementation Plan
1. Re-audited React reference (`swap.ts` namespace barrel, `index.ts`, `swap-root.tsx`, `swap-indicator.tsx`, `swap-root-provider.tsx`, `use-swap.ts`, `use-swap-context.ts`, `swap.anatomy.ts`, `swap.stories.tsx`, `examples/*.tsx`) against the Angular implementation. No new fixes were required; the prior fix already brought public API, story title, example content, demo styles, accessibility, and anatomy export to parity.
2. Re-verified specs pass and the story title/demo styles still match the React CSS module exactly.
3. Recorded the persistent `RootProvider` / `useSwap` deferral with a clear rationale and acknowledged the deliberate `@ark-ui/angular/src/presence` alias path.

## Verification
- [x] Typecheck/build: Not re-run on this re-audit because no source changed. Prior run on `eebe8a568` passed `bun run --cwd packages/angular typecheck`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/swap/swap.spec.ts` — 1 file, 10 tests, all passing.
- [x] Storybook render: Prior run reached `Storybook ready!`. No source change to invalidate.
- [x] Manual/visual checks: Re-confirmed line-by-line that `swap-example-styles.ts` mirrors `.storybook/modules/swap.module.css` (selectors, animation names, durations, easings, keyframes) and that React icon pairs map to the local SVG icon components.

## Commit
- Hash: see latest `fix(angular): align swap with react parity`
- Message: `fix(angular): align swap with react parity`
