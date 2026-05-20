# Carousel Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/carousel/carousel.stories.ts`
- Angular examples: `packages/angular/src/carousel/examples/`
- Angular styles: `packages/angular/src/carousel/carousel-example-styles.ts`
- React story: `packages/react/src/components/carousel/carousel.stories.tsx`
- React examples: `packages/react/src/components/carousel/examples/`
- React styles: `.storybook/modules/carousel.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Story coverage, ordering, and action-button styling now match the React Storybook surface.
- Highest-risk gaps: Full-package typecheck and Storybook startup are currently blocked by unrelated
  `tags-input/examples/*` syntax errors.

## Story Inventory

| Story name         | React             | Angular           | Notes                                                                                                                                             |
| ------------------ | ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Autoplay           | Yes, first export | Yes, first export | Matches React order. Uses identical five-image data and autoplay controls.                                                                        |
| Basic              | Yes               | Yes               | Same five-image data, trigger/item/indicator structure.                                                                                           |
| Controlled         | Yes               | Yes               | React uses `useState`; Angular uses `signal` with `[(page)]`. No change; framework-idiomatic parity.                                              |
| ThumbnailIndicator | Yes               | Yes               | Same five-image data and thumbnail indicators.                                                                                                    |
| DynamicSlides      | Yes               | Yes               | Same `[0, 1, 2, 3, 4]` starting data and append behavior. Button styling now matches the shared button surface.                                   |
| PauseOnHover       | Yes               | Yes               | Same autoplay/loop state text and pointer pause/play behavior.                                                                                    |
| RootProvider       | Yes               | Yes               | React uses `useCarousel({ slideCount })`; Angular uses `useCarousel({ context: () => ({ slideCount }) })`. No change; framework-idiomatic parity. |
| ScrollTo           | Yes               | Yes               | Same slide count and `scrollToIndex(3)` action. Button styling now matches the shared button surface.                                             |
| SlidesPerPage      | Yes               | Yes               | Same six slides, `slidesPerPage=2`, `spacing="20px"`, and page snap indicators.                                                                   |
| Spacing            | Yes               | Yes               | Same six slides, `slidesPerPage=1.5`, `spacing="48px"`, and status copy.                                                                          |
| VariableSize       | Yes               | Yes               | Same five item widths/labels, `autoSize`, `spacing="8px"`, and snap alignment.                                                                    |
| Vertical           | Yes, last export  | Yes, last export  | Matches React order. Same vertical data and controls.                                                                                             |

## Example Data Sources

| Example            | Data origin                            | Shape                                              | Dynamic/async                                              | Divergence                                                                                                          |
| ------------------ | -------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Autoplay           | Local `images` array in each example   | 5 `{ src, alt }` records using seeded Picsum URLs  | Autoplay behavior from carousel machine; no async fetching | No data divergence. Angular manually switches icons via context because Angular indicator fallback is string-based. |
| Basic              | Local `images` array in each example   | 5 `{ src, alt }` records                           | None                                                       | No divergence.                                                                                                      |
| Controlled         | Local `images` array plus page state   | 5 `{ src, alt }`, page number                      | Controlled state updates on page change                    | Angular `signal<number \| undefined>(0)` with `[(page)]`; React `useState(0)` with `onPageChange`. No change.       |
| ThumbnailIndicator | Local `images` array                   | 5 `{ src, alt }` records reused for thumbnails     | None                                                       | No divergence.                                                                                                      |
| DynamicSlides      | Local state                            | Numeric array `[0, 1, 2, 3, 4]`; appends `max + 1` | User click mutates slides; controlled page state           | No data divergence.                                                                                                 |
| PauseOnHover       | Local `images` array                   | 5 `{ src, alt }` records                           | Pointer over pauses, pointer leave plays                   | No divergence.                                                                                                      |
| RootProvider       | Local `images` array and carousel hook | 5 `{ src, alt }` records                           | Page output reflects carousel state                        | Hook construction is framework-specific; no visual divergence.                                                      |
| ScrollTo           | Generated array/length                 | 5 synthetic slide positions                        | User click calls `scrollToIndex(3)`                        | React passes literal `slideCount={5}`; Angular stores `Array.from({ length: 5 })`. No change.                       |
| SlidesPerPage      | Generated `Array.from({ length: 6 })`  | 6 synthetic slide positions                        | Page snap points derived from carousel context             | No divergence.                                                                                                      |
| Spacing            | Generated `Array.from({ length: 6 })`  | 6 synthetic slide positions                        | Page snap points derived from carousel context             | No divergence.                                                                                                      |
| VariableSize       | Local `items` array                    | 5 `{ id, width, label }` records                   | Page snap points derived from carousel context             | No divergence.                                                                                                      |
| Vertical           | Local `images` array                   | 5 `{ src, alt }` records                           | None                                                       | No divergence.                                                                                                      |

## Sections / Structure

- Meta differences: Both stories only set `title: 'Components / Carousel'`; neither defines parameters, decorators,
  argTypes, args, or tags at the meta level.
- Decorator differences: React re-exports example functions directly. Angular wraps each standalone example with
  `moduleMetadata({ imports: [...] })` and renders its selector, which matches neighboring Angular story conventions.
- Per-story decorators / args / controls: No story-specific args or controls on either side. Angular story export order
  needs to match React: `Autoplay`, `Basic`, `Controlled`, `ThumbnailIndicator`, `DynamicSlides`, `PauseOnHover`,
  `RootProvider`, `ScrollTo`, `SlidesPerPage`, `Spacing`, `VariableSize`, `Vertical`.

## Styling

| Element        | React selector / class                                    | Angular selector / class                  | Gap                                                                                                                                          | Fix                                                    |
| -------------- | --------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Root           | `.Root`                                                   | `.Root`                                   | Matches layout, gap, width, max-width, vertical orientation.                                                                                 | No change.                                             |
| Item group     | `.ItemGroup`                                              | `.ItemGroup`                              | Matches flex/overflow/radius and scrollbar hiding.                                                                                           | No change.                                             |
| Item image     | `.Item img`                                               | `.Item img`                               | Matches sizing/object-fit/radius/background.                                                                                                 | No change.                                             |
| Slide          | `.Slide`                                                  | `.Slide`                                  | Matches centered block, size, border, type.                                                                                                  | No change.                                             |
| Controls       | `.Control`                                                | `.Control`                                | Matches flex layout, gap, vertical and centered variants.                                                                                    | No change.                                             |
| Triggers       | `.Trigger`, `.AutoplayTrigger`                            | `.Trigger`, `.AutoplayTrigger`            | Matches primary visual states; Angular has extra disabled state on autoplay trigger, which is harmless.                                      | No change.                                             |
| Indicators     | `.Indicator`, `.ThumbnailIndicator`                       | `.Indicator`, `.ThumbnailIndicator`       | Matches sizes, current states, focus rings, thumbnail image fit.                                                                             | No change.                                             |
| Action buttons | `button.Root` from `.storybook/modules/button.module.css` | `.Button` in `carousel-example-styles.ts` | Angular local button is smaller and lacks min-width, transition, line-height, svg sizing, disabled filter, and `aria-expanded` hover parity. | Update `.Button` to mirror shared React button module. |

## Gap Matrix

| Area                  | Gap                                                          | React reference                                               | Angular location                                           | Fix                                                        |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| Story ordering        | Angular order differs from React                             | `packages/react/src/components/carousel/carousel.stories.tsx` | `packages/angular/src/carousel/carousel.stories.ts`        | Reorder imports and exports.                               |
| Action button styling | Angular `.Button` does not mirror shared React button module | `.storybook/modules/button.module.css`                        | `packages/angular/src/carousel/carousel-example-styles.ts` | Expand `.Button` rules to match the shared button surface. |

## Implementation Plan

1. Reorder Angular carousel story imports and named exports to match the React story.
2. Align Angular `.Button` styling with `.storybook/modules/button.module.css` for the `DynamicSlides` and `ScrollTo`
   actions.
3. Run focused carousel verification, Storybook startup, typecheck, and `git diff --check`; record results.

## Deferred (component-level work)

- None identified.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6012 --ci` attempted; failed before serving
      because unrelated `tags-input/examples/*` files have syntax errors around `template` and `styles` component
      metadata.
- [ ] Visual check of each story: Not completed because Storybook startup is blocked by unrelated
      `tags-input/examples/*` syntax errors.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/carousel/carousel.spec.ts` passed, 1 file / 12
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` attempted; failed before carousel-specific validation
      because unrelated `tags-input/examples/*` files have syntax errors around `template` and `styles` component
      metadata.
- [x] Diff check: `git diff --check` passed. `git diff --check -- packages/angular/src/carousel` passed.
      `git diff --no-index --check /dev/null docs/story-audit/carousel.md` passed.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align carousel story with react parity`
