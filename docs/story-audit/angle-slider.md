# Angle Slider Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/angle-slider/angle-slider.stories.ts`
- Angular examples: `packages/angular/angle-slider/examples/basic.ts`, `controlled.ts`, `disabled.ts`, `step.ts`, `context.ts`, `root-provider.ts`
- Angular styles: `packages/angular/angle-slider/angle-slider-example-styles.ts`
- React story: `packages/react/src/components/angle-slider/angle-slider.stories.tsx`
- React examples: `packages/react/src/components/angle-slider/examples/basic.tsx`, `controlled.tsx`, `disabled.tsx`, `step.tsx`, `context.tsx`, `root-provider.tsx`
- React styles: `.storybook/modules/angle-slider.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Story exports, ordering, example data, and demo styling match the React Storybook surface.
- Highest-risk gaps:
  - No story-surface fixes required.
  - Angular has an empty `examples/icons.ts` placeholder with no React story reference, but it is not imported by the story file and has no Storybook surface.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | `export { Basic } from './examples/basic'` | `Basic` renders `<angle-slider-basic-example />` | Matches. |
| Controlled | `export { Controlled } from './examples/controlled'` | `Controlled` renders `<angle-slider-controlled-example />` | Matches. |
| Disabled | `export { Disabled } from './examples/disabled'` | `Disabled` renders `<angle-slider-disabled-example />` | Matches. |
| Step | `export { Step } from './examples/step'` | `Step` renders `<angle-slider-step-example />` | Matches. |
| Context | `export { Context } from './examples/context'` | `Context` renders `<angle-slider-context-example />` | Matches. |
| RootProvider | `export { RootProvider } from './examples/root-provider'` | `RootProvider` renders `<angle-slider-root-provider-example />` | Matches. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Hard-coded markers in each example. | Eight numeric degree markers: `0, 45, 90, 135, 180, 225, 270, 315`. | None. | No divergence. Angular stores the array on the component class. |
| Controlled | React `useState(45)`; Angular `signal<number \| undefined>(45)`. | Single numeric value plus the same eight markers. | Synchronous value updates through `onValueChange` / `[(value)]`. | Framework-idiomatic state only; no change. |
| Disabled | Static disabled root with default value `45` and the same markers. | Single numeric default plus eight markers. | None. | No divergence. |
| Step | Static step value `15` and the same markers. | Single numeric step plus eight markers. | None. | No divergence. |
| Context | Context API value rendered in the label and the same markers. | Context exposes current numeric value. | None. | Angular uses `ng-template arkAngleSliderContext`; no change. |
| RootProvider | Hook/provider instance plus the same markers; button sets value to `90`. | `UseAngleSliderReturn` and a button click. | Synchronous click handler. | Angular uses `angleSlider.api().setValue(90)` because `api` is a signal; no change. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Angle Slider'`. Angular imports `StoryObj` and uses per-story `moduleMetadata` imports for standalone examples.
- Decorator differences: React has no decorators. Angular uses `moduleMetadata({ imports: [Example] })` per story, matching neighboring Angular story patterns.
- Per-story decorators / args / controls: Neither story defines args, controls, argTypes, tags, backgrounds, or custom parameters.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` from `.storybook/modules/angle-slider.module.css` | `[arkAngleSlider], [arkAngleSliderRootProvider]` | None. | No change. |
| Disabled root | `.Root[data-disabled]` | `[arkAngleSlider][data-disabled], [arkAngleSliderRootProvider][data-disabled]` | None. | No change. |
| Label | `.Label` | `[arkAngleSliderLabel]` | None. | No change. |
| Control | `.Control`, pseudo-elements, `[data-focus]` | `[arkAngleSliderControl]`, pseudo-elements, `[data-focus]` | None. | No change. |
| Thumb | `.Thumb`, pseudo-elements, `:focus-visible`, `:active` | `[arkAngleSliderThumb]`, pseudo-elements, `:focus-visible`, `:active` | None. | No change. |
| Marker group | `.MarkerGroup` | `[arkAngleSliderMarkerGroup]` | None. | No change. |
| Marker | `.Marker`, `[data-state='at-value']`, `[data-state='under-value']` | `[arkAngleSliderMarker]`, matching data-state selectors | None. | No change. |
| Value text | `.ValueText` | `[arkAngleSliderValueText]` | None. | No change. |
| Root provider stack/button | Global `.stack` plus `button.Root` | `.stack` plus `.button` | Button styles mirror the relevant `button.module.css` root/default selectors. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story exports | None. | `packages/react/src/components/angle-slider/angle-slider.stories.tsx` | `packages/angular/angle-slider/angle-slider.stories.ts` | No change. |
| Example data | None. | `packages/react/src/components/angle-slider/examples/*.tsx` | `packages/angular/angle-slider/examples/*.ts` | No change. |
| Styling | None. | `.storybook/modules/angle-slider.module.css`, `.storybook/modules/button.module.css` | `packages/angular/angle-slider/angle-slider-example-styles.ts` | No change. |
| Extra files | Angular includes empty `packages/angular/angle-slider/examples/icons.ts` with no React counterpart. | No React equivalent. | `packages/angular/angle-slider/examples/icons.ts` | No change; it is not imported by Storybook and has no visible surface. |

## Implementation Plan
1. No story-surface code changes required.
2. Keep Storybook verification scoped to static story/style comparison unless component changes affect story rendering.

## Deferred (component-level work)
- Marker static numeric coercion and test parity are tracked in `docs/audit/angle-slider.md`.

## Verification
- [ ] Storybook startup: Not run; no story-surface code changed.
- [x] Visual check of each story: Static source comparison completed for Basic, Controlled, Disabled, Step, Context, and RootProvider.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci angle-slider/angle-slider.spec.ts` passed and covers imported examples.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
