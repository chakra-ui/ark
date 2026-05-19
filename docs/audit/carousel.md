# Carousel Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/carousel/`, including directives, `use-carousel.ts`, `carousel.stories.ts`, `carousel-example-styles.ts`, examples, and `carousel.spec.ts`.
- React files: `packages/react/src/components/carousel/`, including root, root provider, parts, context helper, hook, stories, examples, and `carousel.test.tsx`.
- Storybook/style files: `packages/react/src/components/carousel/carousel.stories.tsx`, `packages/react/src/components/carousel/examples/`, `packages/angular/src/carousel/carousel.stories.ts`, `packages/angular/src/carousel/examples/`, `packages/angular/src/carousel/carousel-example-styles.ts`, `.storybook/modules/carousel.module.css`.

## Summary
- Status: Fixed with one unrelated package typecheck blocker deferred.
- Highest-risk gaps: Angular Storybook was missing six React carousel examples (`ThumbnailIndicator`, `PauseOnHover`, `ScrollTo`, `SlidesPerPage`, `Spacing`, and `VariableSize`), and the shared Angular example styles did not cover the React demo classes, thumbnail indicators, image slides, autoplay controls, or orientation-specific layouts.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Angular exposes only `Basic`, `Controlled`, `Autoplay`, `DynamicSlides`, `Vertical`, and `RootProvider`; React also exposes `ThumbnailIndicator`, `PauseOnHover`, `ScrollTo`, `SlidesPerPage`, `Spacing`, and `VariableSize`. | `packages/react/src/components/carousel/carousel.stories.tsx` | `packages/angular/src/carousel/carousel.stories.ts` | Add missing Angular example components and story exports. |
| Styling parity | Angular examples use minimal generic data-part styles and text-only controls, so React demo selectors such as `.Root`, `.ItemGroup`, `.Item`, `.Slide`, `.Control`, `.Trigger`, `.AutoplayTrigger`, `.ProgressText`, `.Indicator`, `.ThumbnailIndicator`, and `.StatusText` are not represented. | `.storybook/modules/carousel.module.css` | `packages/angular/src/carousel/carousel-example-styles.ts` | Port the Storybook demo styling into the Angular example stylesheet with equivalent class and data-state selectors. |
| Demo functionality | Angular examples do not demonstrate context API methods (`pause`, `play`, `scrollToIndex`) or page-snap-point-driven indicators used by multi-slide and variable-size React demos. | `pause-on-hover.tsx`, `scroll-to.tsx`, `slides-per-page.tsx`, `spacing.tsx`, `variable-size.tsx` | `packages/angular/src/carousel/examples/` | Add Angular examples using `arkCarouselContext` template context and existing directive APIs. |
| Demo coverage | Angular spec only compiles the basic and root-provider examples, so new Storybook examples could regress without a focused compile check. | `carousel.test.tsx` verifies the main React demo | `packages/angular/src/carousel/carousel.spec.ts` | Add a compile smoke test for the carousel Storybook examples. |
| Public API | Root inputs, page model, status outputs, parts, `RootProvider`, `Context`, `ProgressText`, anatomy, and types are present. `pageDetailsChange` is intentionally extra because `model()` owns `pageChange`. | `carousel-root.tsx`, `carousel.ts`, `index.ts` | `packages/angular/src/carousel/*.ts` | No change. |

## Implementation Plan
1. Add missing Angular examples for thumbnail indicators, pause-on-hover, scroll-to, slides-per-page, spacing, and variable-size.
2. Update existing carousel examples to use the same demo class names and richer image/indicator/control layouts as the React examples where practical.
3. Expand `carousel-example-styles.ts` to cover React demo selectors and data-state variants.
4. Export all React-parity examples from `carousel.stories.ts`.
5. Add a focused Angular spec that compiles the Storybook example components.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; failed outside carousel on `src/date-input/examples/localized.ts` and `src/date-input/examples/rtl.ts` missing `@ark-ui/angular/locale`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/carousel/carousel.spec.ts` passed, 12 tests.
- [ ] Storybook render: Not run; no browser visual inspection performed in this pass.
- [x] Manual/visual checks: Compared React carousel stories/examples and `.storybook/modules/carousel.module.css` against Angular stories/examples/styles; Angular now exposes the same named carousel demo set and corresponding class/data-state styling.

## Commit
- Hash:
- Message: `fix(angular): align carousel with react parity`
