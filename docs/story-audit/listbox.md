# Listbox Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/listbox/listbox.stories.ts`
- Angular examples: `packages/angular/listbox/examples/*.ts`
- Angular styles: `packages/angular/listbox/listbox-example-styles.ts`
- React story: `packages/react/src/components/listbox/listbox.stories.tsx`
- React examples: `packages/react/src/components/listbox/examples/*.tsx`
- React styles: `.storybook/modules/listbox.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Fixed Angular's public Storybook exports and demo styling to match React.
- Highest-risk gaps: Resolved. Angular no longer exports the React-missing `Empty` and `WithField` stories, and exported stories now use local SVG indicators instead of text glyphs.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Yes | Yes | Same order and data. |
| `Controlled` | Yes | Yes | Same order and initial `md` value. |
| `DisabledItem` | Yes | Yes | Same disabled `Enterprise` item. |
| `ExtendedSelect` | Yes | Yes | Same framework collection and `selectionMode="extended"`. |
| `Filtering` | Yes | Yes | Same initial items and case-insensitive contains filter; Angular uses signal-backed collection instead of React `useListCollection`. |
| `Grid` | Yes | Yes | Same 20-item emoji grid and `columnCount: 5`. |
| `Group` | Yes | Yes | Same city list and region grouping. |
| `Horizontal` | Yes | Yes | Same album cards, remote image URLs, and horizontal orientation. |
| `Multiple` | Yes | Yes | Same weekday collection and `selectionMode="multiple"`. |
| `RootProvider` | Yes | Yes | Same priority list and "Set to High" action; Angular uses `useListbox` signal API. |
| `SelectAll` | Yes | Yes | Same framework list and tri-state select-all behavior. |
| `ValueText` | Yes | Yes | Same color collection and default red/blue values. |
| `Empty` | No | Yes | Remove from Angular Storybook exports; keep example file for component coverage. |
| `WithField` | No | Yes | Remove from Angular Storybook exports; keep example file for component coverage. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded local array | 7 country `{ label, value }` items | None | None. |
| `Controlled` | Hard-coded local array | 4 size `{ label, value }` items | Controlled value initialized to `['md']` | Angular uses `signal` two-way binding; no visual divergence. |
| `DisabledItem` | Hard-coded local array | 4 plan items, one `disabled: true` | None | None. |
| `ExtendedSelect` | Hard-coded local array | 6 framework items | None | None. |
| `Filtering` | Hard-coded `initialItems` array | 10 framework items | User input filters collection | Angular reconstructs `createListCollection` from filtered items; equivalent visible behavior. |
| `Grid` | Hard-coded local array | 20 emoji `{ label, value }` items, grid collection with 5 columns | None | None. |
| `Group` | Hard-coded local array | 9 city items with `region` | Collection groups by region | None. |
| `Horizontal` | Hard-coded local array | 5 album `{ title, artist, image }` items | Remote `picsum.photos` images | None. |
| `Multiple` | Hard-coded local array | 7 weekday `{ label, value }` items | None | None. |
| `RootProvider` | Hard-coded local array | 4 priority `{ label, value }` items | Button sets value to `['high']` | Angular uses `listbox.api().setValue`; equivalent behavior. |
| `SelectAll` | Hard-coded local array | 8 framework items | Header toggles all selected values | Angular uses computed text glyph before fix; React uses SVG icons. |
| `ValueText` | Hard-coded local array | 5 color items | Default selected values `['red', 'blue']` | None. |

## Sections / Structure
- Meta differences: Both stories only set `title: 'Components / Listbox'`; no args, argTypes, decorators, parameters, or tags.
- Decorator differences: React re-exports component examples directly. Angular wraps each example with `moduleMetadata({ imports: [...] })` and renders the standalone component selector.
- Per-story decorators / args / controls: Angular has per-story `moduleMetadata` decorators and explicit render templates; React examples have none. This is framework-idiomatic and requires no change.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkListboxRoot], [arkListboxRootProvider]` | Equivalent. | No change. |
| Label/value text | `.Label`, `.ValueText` | `[arkListboxLabel]`, `[arkListboxValueText]` | Equivalent. | No change. |
| Content/grid content | `.Content`, `.GridContent` | `[arkListboxContent]`, `.grid-content` | Equivalent. | No change. |
| Items/grid/card | `.Item`, `.GridItem`, `.ItemCard` | `[arkListboxItem]`, `.grid-item`, `.item-card` | Equivalent states; Angular uses text icons. | Add SVG icon components and render them inside indicators. |
| Select-all header | `.SelectAllHeader`, `.SelectAllHeaderIndicator` | `.select-all-header`, `.select-all-header-indicator` | Angular uses check/minus text glyphs. | Add check/minus SVG icons and keep empty state truly empty. |
| Root provider button | `button.Root` from `button.module.css` | `.button` | Angular lacks shared hover/focus/disabled/icon sizing surface. | Expand `.button` to mirror shared button CSS. |
| Filtering input | `field.Input` from `field.module.css` | `input[arkListboxInput]` | Angular lacks shared placeholder/focus transitions. | Expand input CSS to mirror field input CSS. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story exports | Angular exports `Empty` and `WithField`; React does not. | `packages/react/src/components/listbox/listbox.stories.tsx` | `packages/angular/listbox/listbox.stories.ts` | Remove those public Storybook exports and imports. |
| Indicators | React uses SVG check/minus icons; Angular uses text glyphs. | `packages/react/src/components/listbox/examples/*.tsx` | `packages/angular/listbox/examples/*.ts` | Add local SVG icon components and use them in indicators. |
| Shared button styling | Root-provider button is visually smaller and lacks shared states. | `.storybook/modules/button.module.css` | `packages/angular/listbox/listbox-example-styles.ts` | Align `.button` rules. |
| Filtering input styling | Filtering input lacks shared placeholder/focus transitions. | `.storybook/modules/field.module.css` | `packages/angular/listbox/listbox-example-styles.ts` | Align `input[arkListboxInput]` rules. |

## Implementation Plan
1. Remove Angular-only `Empty` and `WithField` imports/exports from `listbox.stories.ts`.
2. Add listbox-local check and minus SVG components for story examples.
3. Replace listbox indicator text glyphs with SVG components in exported examples.
4. Align root-provider button and filtering input styles with the React Storybook modules.
5. Run narrow listbox tests, typecheck, Storybook startup, and `git diff --check`.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6011 --ci` served successfully at `http://localhost:6011/`; process was stopped after startup. Existing warnings reported unused TypeScript compilation entries and a `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed in a browser side-by-side review during this run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci listbox/listbox.spec.ts` passed, 1 file / 14 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and `forms isolation: ok`.
- [x] Whitespace: `git diff --check` passed; no-index whitespace checks for new `packages/angular/listbox/examples/icons.ts` and ignored `docs/story-audit/listbox.md` produced no whitespace warnings.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align listbox story with react parity`
