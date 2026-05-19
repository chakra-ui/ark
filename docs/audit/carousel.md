# Carousel Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/carousel/`, including directives, `use-carousel.ts`, `carousel.stories.ts`, `carousel-example-styles.ts`, examples, and `carousel.spec.ts`.
- React files: `packages/react/src/components/carousel/`, including root, root provider, parts, context helper, hook, stories, examples, and `carousel.test.tsx`.
- Storybook/style files: `packages/react/src/components/carousel/carousel.stories.tsx`, `packages/react/src/components/carousel/examples/`, `packages/angular/src/carousel/carousel.stories.ts`, `packages/angular/src/carousel/examples/`, `packages/angular/src/carousel/carousel-example-styles.ts`, `.storybook/modules/carousel.module.css`.

## Summary
- Status: Re-audited and fixed. Angular Storybook now matches React story names, demo selectors, and visual affordances. SVG icons replace ASCII characters in every example and the autoplay trigger swaps Pause/Play glyphs via `arkCarouselContext`.
- Highest-risk gaps in this pass: Angular trigger buttons rendered ASCII fallback characters (`<`, `>`, `||`, `>`) instead of the lucide-react SVGs the React examples render. The shared host stylesheet capped `:host` width at `32rem`, which would clip the vertical demo's `max-content` layout, and the example styles never sized the `& svg` glyphs the React `.Trigger`/`.AutoplayTrigger`/`.Button` selectors rely on.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | All twelve React stories (`Basic`, `Controlled`, `ThumbnailIndicator`, `Autoplay`, `DynamicSlides`, `PauseOnHover`, `Vertical`, `RootProvider`, `ScrollTo`, `SlidesPerPage`, `Spacing`, `VariableSize`) are exported from Angular Storybook with matching example components. | `packages/react/src/components/carousel/carousel.stories.tsx` | `packages/angular/src/carousel/carousel.stories.ts` | No change. |
| Styling parity — icons | React triggers render lucide-react SVGs sized via `.Trigger svg { width: 1rem; height: 1rem }`. Angular triggers rendered raw ASCII text (`&lt;`, `&gt;`, `||`, `>`) with no SVG, so the rule had no effect. | `examples/basic.tsx` etc. + `.storybook/modules/carousel.module.css` `.Trigger`, `.AutoplayTrigger` | `packages/angular/src/carousel/examples/*.ts` and `carousel-example-styles.ts` | Inlined `<svg>` glyphs matching `ArrowLeftIcon`, `ArrowRightIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `PlusIcon`, `PauseIcon`, `PlayIcon`. Added `.Trigger svg, .AutoplayTrigger svg, .Button svg { width: 1rem; height: 1rem }` to the shared stylesheet. |
| Styling parity — host width | `:host { max-width: 32rem }` capped every carousel demo at 32rem, which clips the React `.Root[data-orientation='vertical'] { max-width: max-content }` layout for the Vertical story. | `.storybook/modules/carousel.module.css` `.Root[data-orientation='vertical']` | `packages/angular/src/carousel/carousel-example-styles.ts` | Dropped the host `max-width` so `.Root` (default `32rem`) and `.Root[data-orientation='vertical']` (`max-content`) decide width per orientation. |
| Demo functionality — autoplay indicator | React `<Carousel.AutoplayIndicator fallback={<PlayIcon />}><PauseIcon /></Carousel.AutoplayIndicator>` swaps SVGs based on `isPlaying`. Angular `arkCarouselAutoplayIndicator` only swaps text strings (`label`, `fallback`), which cannot render SVG icons. | `examples/autoplay.tsx` | `packages/angular/src/carousel/examples/autoplay.ts` | Replaced `<span arkCarouselAutoplayIndicator label="||" fallback=">">` with `<ng-template arkCarouselContext let-api>` that `@if (api().isPlaying)` toggles inline Pause/Play SVGs inside the autoplay trigger button. |
| Demo functionality — vertical default | React vertical example passes `defaultPage={0}` to mirror the thumbnail demo's seeded uncontrolled state. Angular omitted it. | `examples/vertical.tsx` | `packages/angular/src/carousel/examples/vertical.ts` | Added `[defaultPage]="0"` to the vertical example for parity. |
| Public API | Root inputs, page model, status outputs, parts, `RootProvider`, `Context`, `ProgressText`, anatomy, and types remain at parity. `pageDetailsChange` is intentionally extra because `model()` owns `pageChange`. | `carousel-root.tsx`, `carousel.ts`, `index.ts` | `packages/angular/src/carousel/*.ts` | No change. |
| Test parity | React only ships a basic axe test plus prev/next button presence. Angular already covers next/prev, indicators, controlled `[(page)]` single emission, dynamic slide counts, autoplay timer lifecycle, vertical orientation, root provider, and a Storybook example compile smoke. | `carousel.test.tsx` | `carousel.spec.ts` | No change. |

## Implementation Plan
1. Replace ASCII text fallback glyphs in every Angular carousel example with inline lucide-style SVGs matching the React example icons.
2. Reshape the Angular autoplay example so the trigger swaps Pause/Play SVGs via `arkCarouselContext` instead of relying on the string-only `arkCarouselAutoplayIndicator`.
3. Restore parity in the shared example stylesheet: drop the host width cap so vertical stories can use `max-content`, and add `& svg` size rules for `.Trigger`, `.AutoplayTrigger`, and `.Button`.
4. Mirror React's `defaultPage={0}` seed on the Angular vertical example.
5. Re-run the carousel spec and Angular typecheck to confirm no regressions.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` succeeded (no remaining `@ark-ui/angular/locale` blocker; `forms isolation: ok`).
- [x] Component tests: `bun run --cwd packages/angular test:ci src/carousel/carousel.spec.ts` passed, 12 tests.
- [ ] Storybook render: Not run; no headed browser visual inspection performed in this pass.
- [x] Manual/visual checks: Re-read every React example and `.storybook/modules/carousel.module.css` selector, then audited each Angular example/template/style to confirm matching `.Root`, `.ItemGroup`, `.Item`, `.Slide`, `.Control`, `.Trigger`, `.AutoplayTrigger`, `.IndicatorGroup`, `.Indicator`, `.ThumbnailIndicator`, `.StatusText`, and `.Button` usage with the appropriate data-state selectors and inline SVGs.

## Commit
- Hash: pending
- Message: `fix(angular): align carousel with react parity`
