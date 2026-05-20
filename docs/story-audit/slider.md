# Slider Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/slider/slider.stories.ts`
- Angular examples: `packages/angular/slider/examples/basic.ts`, `center-origin.ts`, `context.ts`,
  `dragging-indicator.ts`, `min-max.ts`, `on-event.ts`, `range.ts`, `root-provider.ts`, `step.ts`, `thumb-alignment.ts`,
  `thumb-collision.ts`, `thumb-overlap.ts`, `vertical.ts`, `with-marks.ts`
- Angular styles: `packages/angular/slider/slider-example-styles.ts`
- React story: `packages/react/src/components/slider/slider.stories.tsx`
- React examples: `packages/react/src/components/slider/examples/basic.tsx`, `center-origin.tsx`, `context.tsx`,
  `dragging-indicator.tsx`, `min-max.tsx`, `on-event.tsx`, `range.tsx`, `root-provider.tsx`, `step.tsx`,
  `thumb-alignment.tsx`, `thumb-collision.tsx`, `thumb-overlap.tsx`, `vertical.tsx`, `with-marks.tsx`
- React styles: `.storybook/modules/slider.module.css`; `root-provider.tsx` also uses `styles/button.module.css`

## Summary

- Status: Story inventory, ordering, examples, data, and slider styling are aligned. Angular translates React CSS module
  classes to directive selectors and uses `.slider-example-header` / `.slider-example-button` for React inline header
  layout and root-provider button styling.
- Highest-risk gaps: No story-surface fix required. The only observed output shape difference is Angular-specific:
  `(valueChange)` logs the model value rather than the React details object, while `(valueChangeEnd)` logs
  `details.value`.

## Story Inventory

| Story name        | React | Angular | Notes                                                                                                                                     |
| ----------------- | ----- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Basic             | Yes   | Yes     | `defaultValue` `[40]`, label, value text, control, track, range, one thumb, hidden input.                                                 |
| CenterOrigin      | Yes   | Yes     | `origin="center"`, `defaultValue` `[75]`.                                                                                                 |
| Context           | Yes   | Yes     | Renders dragging state and value from slider context. Angular uses `ng-template arkSliderContext`.                                        |
| DraggingIndicator | Yes   | Yes     | One thumb with dragging indicator and hidden input.                                                                                       |
| MinMax            | Yes   | Yes     | `min=-10`, `max=10`, `defaultValue` `[5]`. Angular uses property bindings for numeric values.                                             |
| OnEvent           | Yes   | Yes     | Logs value-change and value-change-end callbacks. Angular logs raw model value for `(valueChange)`, details value for `(valueChangeEnd)`. |
| Range             | Yes   | Yes     | Two thumbs with `defaultValue` `[30, 60]`.                                                                                                |
| RootProvider      | Yes   | Yes     | External slider service plus Focus button. Angular uses `[arkSliderRootProvider]` and `useSlider({ context: () => ({}) })`.               |
| Step              | Yes   | Yes     | `step=0.01`, `min=5`, `max=10`, `defaultValue` `[7.5]`.                                                                                   |
| ThumbAlignment    | Yes   | Yes     | `thumbAlignment="center"`, `defaultValue` `[50]`.                                                                                         |
| ThumbCollision    | Yes   | Yes     | `thumbCollisionBehavior="push"`, `defaultValue` `[25, 60]`.                                                                               |
| ThumbOverlap      | Yes   | Yes     | `minStepsBetweenThumbs=5`, `defaultValue` `[25, 60]`.                                                                                     |
| Vertical          | Yes   | Yes     | `orientation="vertical"` with label, value text, control, one thumb.                                                                      |
| WithMarks         | Yes   | Yes     | Mark values `[0, 25, 50, 75, 100]`. Angular stores values on the example class and renders with `@for`.                                   |

## Example Data Sources

| Example           | Data origin                           | Shape                                             | Dynamic/async                                | Divergence                                                                                                   |
| ----------------- | ------------------------------------- | ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Basic             | Inline default value                  | `[40]`                                            | None                                         | None                                                                                                         |
| CenterOrigin      | Inline default value                  | `[75]`                                            | None                                         | None                                                                                                         |
| Context           | Inline default value plus context API | `[40]`; derived `dragging` and `value`            | Context updates from Zag state               | Angular template API signal is framework-idiomatic.                                                          |
| DraggingIndicator | Inline default value plus thumb API   | `[40]`; derived thumb value                       | Dragging indicator visibility/state from Zag | None                                                                                                         |
| MinMax            | Inline bounds and default             | min `-10`, max `10`, value `[5]`                  | None                                         | Angular uses property bindings for numbers.                                                                  |
| OnEvent           | Event handlers                        | Value array and end details                       | Console side effect                          | Angular `(valueChange)` receives raw model value by convention; visible log payload remains the value array. |
| Range             | Inline default value                  | `[30, 60]`                                        | None                                         | None                                                                                                         |
| RootProvider      | `useSlider` service                   | External service with default machine context     | Focus button calls API                       | Angular uses `slider.api().focus()` because `api` is a signal.                                               |
| Step              | Inline bounds, step, default          | min `5`, max `10`, step `0.01`, value `[7.5]`     | None                                         | Angular uses property bindings for numbers.                                                                  |
| ThumbAlignment    | Inline alignment/default              | `thumbAlignment="center"`, value `[50]`           | None                                         | None                                                                                                         |
| ThumbCollision    | Inline collision/default              | `thumbCollisionBehavior="push"`, value `[25, 60]` | None                                         | None                                                                                                         |
| ThumbOverlap      | Inline overlap/default                | `minStepsBetweenThumbs=5`, value `[25, 60]`       | None                                         | Angular uses property binding for the numeric input.                                                         |
| Vertical          | Inline orientation                    | `orientation="vertical"`                          | None                                         | None                                                                                                         |
| WithMarks         | Inline mark array                     | Five numeric marks                                | None                                         | Angular class field replaces React `.map`; same values and order.                                            |

## Sections / Structure

- Meta differences: Both stories use `title: 'Components / Slider'`; neither defines args, argTypes, tags, parameters,
  or global decorators.
- Decorator differences: Angular wraps every example with `moduleMetadata({ imports: [...] })` and renders the
  standalone example selector. React re-exports example components directly.
- Per-story decorators / args / controls: No per-story args or controls in either stack. Story order is identical.

## Styling

| Element              | React selector / class                                    | Angular selector / class                 | Gap                                                                                   | Fix       |
| -------------------- | --------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- | --------- |
| Root                 | `.Root`                                                   | `[arkSlider]`, `[arkSliderRootProvider]` | None                                                                                  | No change |
| Label                | `.Label`                                                  | `[arkSliderLabel]`                       | None                                                                                  | No change |
| Value text           | `.ValueText`                                              | `[arkSliderValueText]`                   | None                                                                                  | No change |
| Control              | `.Control`                                                | `[arkSliderControl]`                     | None                                                                                  | No change |
| Track                | `.Track`                                                  | `[arkSliderTrack]`                       | None                                                                                  | No change |
| Range                | `.Range`                                                  | `[arkSliderRange]`                       | None                                                                                  | No change |
| Thumb                | `.Thumb`                                                  | `[arkSliderThumb]`                       | None                                                                                  | No change |
| Dragging indicator   | `.DraggingIndicator`                                      | `[arkSliderDraggingIndicator]`           | None                                                                                  | No change |
| Marker group         | `.MarkerGroup`                                            | `[arkSliderMarkerGroup]`                 | None                                                                                  | No change |
| Marker               | `.Marker`                                                 | `[arkSliderMarker]`                      | None                                                                                  | No change |
| Header wrapper       | React inline `display:flex; justifyContent:space-between` | `.slider-example-header`                 | None                                                                                  | No change |
| Root-provider button | `styles/button.module.css` `button.Root`                  | `.slider-example-button`                 | Angular approximates shared button module locally to avoid a shared style dependency. | No change |

## Gap Matrix

| Area            | Gap                                                                                        | React reference                                              | Angular location                                   | Fix                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Story inventory | None; all 14 React exports exist in Angular in the same order.                             | `packages/react/src/components/slider/slider.stories.tsx`    | `packages/angular/slider/slider.stories.ts`        | No change                                                                                         |
| Example data    | None requiring a story fix.                                                                | `packages/react/src/components/slider/examples/*.tsx`        | `packages/angular/slider/examples/*.ts`            | No change                                                                                         |
| Styling         | No slider style gap found; directive selectors mirror the React CSS module.                | `.storybook/modules/slider.module.css`                       | `packages/angular/slider/slider-example-styles.ts` | No change                                                                                         |
| Event demo      | Angular `(valueChange)` logs raw value rather than React's `details.value` callback shape. | `packages/react/src/components/slider/examples/on-event.tsx` | `packages/angular/slider/examples/on-event.ts`     | No change: Angular model output convention; console output still demonstrates the changing value. |

## Implementation Plan

1. No story/example/style edits are required for slider.
2. Track component-level test parity in `docs/audit/slider.md`.

## Deferred (component-level work)

- Add Angular component tests for React's multi-thumb keyboard, RTL, vertical, and no-overlap behaviors.

## Verification

- [ ] Storybook startup: Not run; no story, example, or style code changed.
- [x] Visual check of each story: Source-level inventory compared all 14 React stories against Angular equivalents and
      found no story-surface fix required.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci slider/slider.spec.ts` passed with 1 file
      and 15 tests.
- [x] Diff hygiene: `git diff --check` passed.

## Commit

- Hash: This commit.
- Message: fix(angular): align new components with react parity
