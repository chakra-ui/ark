# Angle Slider Angular Parity Audit

## Scope
- Angular files: `packages/angular/angle-slider/`
- React files: `packages/react/src/components/angle-slider/`
- Storybook/style files: `packages/react/src/components/angle-slider/angle-slider.stories.tsx`, `packages/angular/angle-slider/angle-slider.stories.ts`, `.storybook/modules/angle-slider.module.css`, `.storybook/modules/button.module.css`, `packages/angular/angle-slider/angle-slider-example-styles.ts`

## Summary
- Status: Mostly aligned; focused fixes needed for numeric marker input coercion and React test expectation coverage.
- Highest-risk gaps:
  - `ArkAngleSliderMarker.value` is a required numeric part prop but does not use Angular's `numberAttribute` transform, unlike comparable numeric part directives such as `ArkSliderMarker`.
  - Angular specs do not cover the React readonly state or value text display expectations.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Marker `value` is numeric in React and in Zag, but Angular accepts static template attributes as strings at runtime. | `packages/react/src/components/angle-slider/angle-slider-marker.tsx` splits `value` as `MarkerProps['value']`. | `packages/angular/angle-slider/angle-slider-marker.ts` | Add `numberAttribute` transform to the required `value` input and cover static attribute parsing. |
| Tests / a11y state | React verifies readonly state sets `data-readonly` on the slider thumb; Angular has disabled coverage but no readonly parity assertion. | `packages/react/src/components/angle-slider/tests/angle-slider.test.tsx` story `should set angle slider as readonly`. | `packages/angular/angle-slider/angle-slider.spec.ts` | Add a readonly host test asserting the thumb receives `data-readonly`. |
| Tests / value text | React verifies the basic composition displays `0deg`; Angular example tests only assert parts render. | `packages/react/src/components/angle-slider/tests/angle-slider.test.tsx` story `should display helper text`. | `packages/angular/angle-slider/angle-slider.spec.ts` | Add a focused assertion that the basic example renders `0deg`. |
| Public API | React `Root` exposes `id`, `ids`, `name`, `invalid`, `readOnly`, `disabled`, `onValueChangeEnd`, `onValueChange`, `defaultValue`, `value`, `step`, `aria-label`, and `aria-labelledby`. Angular exposes the same machine inputs, with `value` as a `model()` channel and `valueChangeEnd` as a detail output. | `packages/react/src/components/angle-slider/angle-slider-root.tsx` | `packages/angular/angle-slider/angle-slider-root.ts` | No change. Angular's `valueChange` emits the model value per package convention. |
| Behavior | Root provider, context, hidden input, CVA, disabled, default value, and controlled value behavior are present. | `packages/react/src/components/angle-slider/examples/*.tsx`; `packages/react/src/components/angle-slider/tests/basic.tsx` | `packages/angular/angle-slider/*.ts` and examples | No implementation change beyond marker coercion/test coverage. |
| Accessibility | Label/control/thumb/hidden input props are applied from Zag. Value text also applies `getValueTextProps()` in Angular; React currently renders its text without that prop bag. | `packages/react/src/components/angle-slider/angle-slider-value-text.tsx` | `packages/angular/angle-slider/angle-slider-value-text.ts` | No change. Angular follows the Zag part prop pattern used by the other framework implementations and neighboring Angular value text directives. |
| Exports | Angular exports all root, provider, label, control, thumb, marker group, marker, value text, hidden input, context, anatomy, hook, context injector, and Zag type aliases from the secondary entry point. | `packages/react/src/components/angle-slider/index.ts` and `angle-slider.ts` | `packages/angular/angle-slider/public-api.ts` | No change. No shared export/package edits required. |

## Implementation Plan
1. Update `ArkAngleSliderMarker.value` to transform static attribute values with `numberAttribute`.
2. Add Angular spec coverage for static marker attribute parsing, readonly state, and basic example value text.
3. Run the focused angle-slider spec and `git diff --check`.

## Verification
- [ ] Typecheck/build: Not run; no shared exports or public package wiring changed.
- [x] Component tests: `bun run --cwd packages/angular test:ci angle-slider/angle-slider.spec.ts` passed: 1 file, 20 tests.
- [ ] Storybook render: Not run; story surface is unchanged.
- [x] Manual/visual checks: Static comparison of React CSS module and Angular example styles completed.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
