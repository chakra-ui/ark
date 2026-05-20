# Slider Angular Parity Audit

## Scope

- Angular files: `packages/angular/slider/public-api.ts`, `packages/angular/slider/slider-root.ts`,
  `packages/angular/slider/slider-root-provider.ts`, `packages/angular/slider/slider-context.ts`,
  `packages/angular/slider/slider-control.ts`, `packages/angular/slider/slider-track.ts`,
  `packages/angular/slider/slider-range.ts`, `packages/angular/slider/slider-thumb.ts`,
  `packages/angular/slider/slider-hidden-input.ts`, `packages/angular/slider/slider-dragging-indicator.ts`,
  `packages/angular/slider/slider-marker-group.ts`, `packages/angular/slider/slider-marker.ts`,
  `packages/angular/slider/slider-value-text.ts`, `packages/angular/slider/use-slider.ts`,
  `packages/angular/slider/slider.types.ts`, `packages/angular/slider/slider.anatomy.ts`,
  `packages/angular/slider/slider.spec.ts`
- React files: `packages/react/src/components/slider/slider.ts`, `packages/react/src/components/slider/slider-root.tsx`,
  `packages/react/src/components/slider/slider-root-provider.tsx`,
  `packages/react/src/components/slider/slider-context.tsx`, `packages/react/src/components/slider/slider-control.tsx`,
  `packages/react/src/components/slider/slider-track.tsx`, `packages/react/src/components/slider/slider-range.tsx`,
  `packages/react/src/components/slider/slider-thumb.tsx`,
  `packages/react/src/components/slider/slider-hidden-input.tsx`,
  `packages/react/src/components/slider/slider-dragging-indicator.tsx`,
  `packages/react/src/components/slider/slider-marker-group.tsx`,
  `packages/react/src/components/slider/slider-marker.tsx`,
  `packages/react/src/components/slider/slider-value-text.tsx`, `packages/react/src/components/slider/use-slider.ts`,
  `packages/react/src/components/slider/tests/slider.test.tsx`
- Storybook/style files: `packages/react/src/components/slider/slider.stories.tsx`,
  `packages/react/src/components/slider/examples/*.tsx`, `.storybook/modules/slider.module.css`,
  `packages/angular/slider/slider.stories.ts`, `packages/angular/slider/examples/*.ts`,
  `packages/angular/slider/slider-example-styles.ts`

## Summary

- Status: Implementation and story surface are largely aligned with React. Angular exposes directive equivalents for
  every React part, wires Zag through `useSlider`, supports root-provider/context helpers, CVA, field context, hidden
  inputs, marker state, disabled/read-only/invalid flags, keyboard behavior, and the same example set.
- Highest-risk gaps: Angular tests do not cover React's multi-thumb keyboard contract: min/max range, no-overlap
  behavior, RTL direction, and vertical arrow semantics. Root-provider DI behavior is also not directly asserted for
  slider, even though the story uses it.

## Gap Matrix

| Area          | Gap                                                                                                                                                                  | React reference                                                                                                                    | Angular location                                                                            | Fix                                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Tests         | Angular has only single-thumb keyboard coverage and does not mirror React's two-thumb min/max keyboard tests.                                                        | `packages/react/src/components/slider/tests/slider.test.tsx`                                                                       | `packages/angular/slider/slider.spec.ts`                                                    | Add a two-thumb test host covering ArrowRight/ArrowLeft updates for both thumbs.                                        |
| Tests         | Angular does not assert React's no-overlap behavior when the left thumb reaches the right thumb.                                                                     | `packages/react/src/components/slider/tests/slider.test.tsx`                                                                       | `packages/angular/slider/slider.spec.ts`                                                    | Add a multi-thumb collision test that drives End/ArrowRight and verifies the left thumb stops at the right thumb value. |
| Tests         | Angular does not assert RTL keyboard direction reversal.                                                                                                             | `packages/react/src/components/slider/tests/slider.test.tsx`; React wraps with `LocaleProvider locale="ar-AE"`                     | `packages/angular/slider/slider.spec.ts`; `packages/angular/slider/use-slider.ts`           | Add a test using `provideArkLocale({ locale: 'ar-AE' })` and verify ArrowRight decrements, ArrowLeft increments.        |
| Tests         | Angular does not assert vertical arrow semantics for multi-thumb sliders.                                                                                            | `packages/react/src/components/slider/tests/slider.test.tsx`                                                                       | `packages/angular/slider/slider.spec.ts`                                                    | Add a vertical two-thumb keyboard test for ArrowUp/ArrowDown.                                                           |
| Tests         | Slider root-provider descendants are smoke-rendered through the example, but DI parity is not directly asserted.                                                     | `packages/react/src/components/slider/slider-root-provider.tsx`; `packages/react/src/components/slider/examples/root-provider.tsx` | `packages/angular/slider/slider-root-provider.ts`; `packages/angular/slider/slider.spec.ts` | Add a probe test under `[arkSliderRootProvider]` verifying descendants receive the provided service.                    |
| Public API    | React `onValueChange` receives Zag details; Angular `(valueChange)` is the model channel and emits the raw `number[]` value, while `(valueChangeEnd)` emits details. | `packages/react/src/components/slider/slider-root.tsx`                                                                             | `packages/angular/slider/slider-root.ts`                                                    | No change: follows current Angular model/CVA convention used by slider and sibling form controls.                       |
| Shared wiring | Secondary entry point/package exports were already present for `@ark-ui/angular/slider`.                                                                             | `packages/react/src/components/slider/index.ts`                                                                                    | `packages/angular/slider/ng-package.json`, shared package files                             | No shared export/package change required.                                                                               |

## Implementation Plan

1. Add narrow Angular specs for root-provider DI and the React multi-thumb keyboard scenarios.
2. Keep component implementation, stories, examples, styling, public exports, and shared package files unchanged unless
   tests reveal a real implementation defect.
3. Run the slider spec, Angular typecheck if needed, and `git diff --check`.

## Verification

- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The build emitted existing ng-packagr
      export-condition warnings and Vite transform deprecation warnings.
- [x] Component tests: `bun run --cwd packages/angular test:ci slider/slider.spec.ts` passed with 1 file and 15 tests.
      An initial repo-relative filter attempt,
      `bun run --cwd packages/angular test:ci packages/angular/slider/slider.spec.ts`, failed with "No test files
      found"; reran with the package-relative path.
- [ ] Storybook render: Not run; no story, example, or style code changed.
- [x] Manual/visual checks: Source-level comparison confirmed the 14 React story exports, Angular story exports, example
      data, and slider example styles align.
- [x] Diff hygiene: `git diff --check` passed.

## Commit

- Hash: This commit.
- Message: fix(angular): align new components with react parity
