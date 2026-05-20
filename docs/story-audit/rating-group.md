# Rating Group Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/rating-group/rating-group.stories.ts`
- Angular examples: `packages/angular/rating-group/examples/basic.ts`, `controlled.ts`, `disabled.ts`, `form-usage.ts`, `half-star.ts`, `root-provider.ts`, `with-field.ts`, `icons.ts`
- Angular styles: `packages/angular/rating-group/rating-group-example-styles.ts`
- React story: `packages/react/src/components/rating-group/rating-group.stories.tsx`
- React examples: `packages/react/src/components/rating-group/examples/basic.tsx`, `controlled.tsx`, `disabled.tsx`, `form-usage.tsx`, `half-star.tsx`, `root-provider.tsx`, `with-field.tsx`
- React styles: `.storybook/modules/rating-group.module.css`, shared `button.module.css`, shared `field.module.css`

## Summary
- Status: Story surface is aligned. Angular exports the same stories in the same order and renders equivalent examples with framework-native templates.
- Highest-risk gaps: None requiring story changes. Angular uses a local standalone star icon component equivalent to React's `lucide-react` `StarIcon`.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes | Yes | Default value `3`, label, control, generated items, hidden input. |
| Controlled | Yes | Yes | React `useState(0)` maps to Angular `signal(0)` and `[(value)]`. |
| Disabled | Yes | Yes | Default value `3`, disabled root. |
| FormUsage | Yes | Yes | Form submit reads `review` from `FormData` and alerts it. |
| HalfStar | Yes | Yes | Default value `2.5`, `allowHalf`, half-state indicator. |
| RootProvider | Yes | Yes | Hook-created API with `count: 5`, `defaultValue: 3`, output value display. |
| WithField | Yes | Yes | Field root with helper and error text. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Rating group API `items` | Numbers `1..count`, default count `5` | None | None. |
| Controlled | Local component state | Number value starting at `0` | User interaction updates state | Angular uses signal/model binding instead of React state callback. |
| Disabled | Rating group API `items` | Numbers `1..5` | None | None. |
| FormUsage | Browser `FormData` on submit | Hidden input named `review` | Submit handler alerts selected value | None. |
| HalfStar | Rating group API item state | Numbers `1..5`, default value `2.5` | Pointer position can set half state | None. |
| RootProvider | `useRatingGroup` / `useRatingGroup({ context })` | Hook API with `count: 5`, `defaultValue: 3` | User interaction updates API value | Angular hook takes a context factory per package convention. |
| WithField | Field context + rating group API | Field state plus numbers `1..5` | None | None. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Rating Group'`; Angular uses `StoryObj` render wrappers and `moduleMetadata` imports.
- Decorator differences: React re-exports example components directly; Angular declares one `moduleMetadata` decorator per standalone example import.
- Per-story decorators / args / controls: No args or controls on either side.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkRatingGroup]`, `[arkRatingGroupRootProvider]` | None | No change. |
| Label | `.Label` | `[arkRatingGroupLabel]` | None | No change. |
| Control | `.Control` | `[arkRatingGroupControl]` | None | No change. |
| Item | `.Item` | `[arkRatingGroupItem]` | None | No change. |
| Indicator | `.ItemIndicator` | `.rating-group-item-indicator` | None | No change. |
| Form button | Shared `button.Root` | `.demo-button` | None; Angular mirrors relevant shared button styles locally. | No change. |
| Field | Shared `field.*` classes | `[arkFieldRoot]`, `[arkFieldHelperText]`, `[arkFieldErrorText]` | None; Angular mirrors relevant shared field styles locally. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Stories | Story names and ordering match. | `packages/react/src/components/rating-group/rating-group.stories.tsx` | `packages/angular/rating-group/rating-group.stories.ts` | No change. |
| Examples | Example behavior and data sources match. | `packages/react/src/components/rating-group/examples/` | `packages/angular/rating-group/examples/` | No change. |
| Styling | Demo styling maps React CSS module selectors to Angular attribute selectors. | `.storybook/modules/rating-group.module.css` | `packages/angular/rating-group/rating-group-example-styles.ts` | No change. |
| Assets | React imports `StarIcon` from `lucide-react`; Angular uses an equivalent local standalone SVG component. | React examples | `packages/angular/rating-group/examples/icons.ts` | No change. |

## Implementation Plan
1. No story-surface code changes required.
2. Run narrow rating-group tests after component-test coverage additions.
3. Record verification results here.

## Deferred (component-level work)
- None.

## Verification
- [ ] Storybook startup: Not run; no story/example code changed.
- [x] Visual check of each story: Static source/style comparison confirmed `Basic`, `Controlled`, `Disabled`, `FormUsage`, `HalfStar`, `RootProvider`, and `WithField` match React structure and styling.
- [x] Story-related specs (if any): `bun run --cwd packages/angular test:ci rating-group/rating-group.spec.ts` passed, 18 tests.

## Commit
- Hash: This commit.
- Message: fix(angular): align new components with react parity
