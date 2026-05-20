# Combobox Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/combobox/combobox.stories.ts`
- Angular examples: `packages/angular/combobox/examples/*.ts`
- Angular styles: `packages/angular/combobox/combobox-example-styles.ts`
- React story: `packages/react/src/components/combobox/combobox.stories.tsx`
- React examples: `packages/react/src/components/combobox/examples/*.tsx`
- React styles: `.storybook/modules/combobox.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Story inventory aligned to React. Missing Angular examples were added; Angular-only `Controlled` and `Filterable` remain as files but are no longer exported from Storybook.
- Highest-risk gaps: `RehydrateValue` depends on live SWAPI network responses; `Virtualized` uses a story-local Angular virtual window instead of React's `@tanstack/react-virtual`, with the same country data and scroll-to-index behavior.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes | Yes | Angular now filters the fruit list on input like React. |
| Context | Yes | Yes | Added Angular context-style selected-value display via root API. |
| Grouping | Yes | Yes | Existing Angular grouped continents matched React data. |
| Links | Yes | Yes | Existing Angular resource links matched React story surface. |
| Multiple | Yes | Yes | Angular now removes selected items from the visible collection like React. |
| RehydrateValue | Yes | Yes | Added Angular root-provider example with SWAPI fetch and selected-item hydration. |
| RootProvider | Yes | Yes | Angular now includes Focus button, clear trigger, and filtering. |
| WithField | Yes | Yes | Angular helper copy, clear trigger, field styling, and filtering aligned. |
| Creatable | Yes | Yes | Added Angular allow-custom-value example with create-new option. |
| LimitResults | Yes | Yes | Existing Angular five-result cap matched React. |
| HighlightMatchingText | Yes | Yes | Added Angular highlight example using `ark-highlight`. |
| Dynamic | Yes | Yes | Existing Angular email suggestions matched React. |
| CustomObject | Yes | Yes | Existing Angular custom country objects matched React. |
| AsyncSearch | Yes | Yes | Added Angular delayed movie search example with loading and empty states. |
| Virtualized | Yes | Yes | Added Angular virtualized story using same 225-country data set. |
| AutoHighlight | Yes | Yes | Existing Angular autohighlight story matched React. |
| InlineAutocomplete | Yes | Yes | Existing Angular autocomplete story matched React. |
| Controlled | No | Not exported | Angular-only story export removed from public Storybook list. |
| Filterable | No | Not exported | Angular-only story export removed from public Storybook list. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Hard-coded local fruit array | 6 `{ label, value }` items | Input filters with case-insensitive contains | No change after fix. |
| Context | Hard-coded local size array | 4 `{ label, value }` items | Input filters with case-insensitive contains | Angular displays selected value via `root.api().valueAsString`. |
| Grouping | Hard-coded local countries | 9 `{ label, value, continent }` items grouped by continent | Input filters with case-insensitive contains | No change. |
| Links | Hard-coded local resources | 6 `{ label, value, href }` items | Input filters with case-insensitive contains | No change. |
| Multiple | Hard-coded local skills | 6 `{ label, value }` items | Input filters and selection removes chosen items | No change after fix. |
| RehydrateValue | SWAPI fetch | `Character` objects with name, height, mass, created, edited, url | Fetches on input change; default value `C-3PO`; syncs selected item after collection loads | No component-level gap; network availability can affect demo. |
| RootProvider | Hard-coded local jobs | 6 `{ label, value }` items | Input filters with case-insensitive contains; Focus button calls API | No change after fix. |
| WithField | Hard-coded local departments | 6 `{ label, value }` items | Input filters with case-insensitive contains | No change after fix. |
| Creatable | Hard-coded base labels plus created item state | 4 base `{ label, value }`; created items add `__new__` | Adds `[[new]]` option for non-empty unmatched input and persists created selection | Angular implements the same behavior without React `flushSync`. |
| LimitResults | Hard-coded local cities | 20 `{ label, value }` items, capped to 5 visible | Input filters with case-insensitive contains | No change. |
| HighlightMatchingText | Hard-coded assignees | 6 `{ label, value }` items | Input filters with case-insensitive contains; mark highlights query | Angular uses `ArkHighlightComponent`. |
| Dynamic | Hard-coded domain suffixes | 3 string suffixes generating email suggestions | Input-change generates suggestions | No change. |
| CustomObject | Hard-coded country objects | 3 `{ country, code, flag }` items | Input filters by country | No change. |
| AsyncSearch | Hard-coded movies | 12 `{ id, title, year, director, genre }` items | 300ms delayed search with loading, empty, and error signals | Angular uses sequence cancellation rather than React `useAsyncList` abort signal. |
| Virtualized | Hard-coded countries copied from React | 225 `{ value, label, emoji }` items | Input filters with starts-with; story-local window renders visible rows | Angular uses local virtual math instead of `@tanstack/react-virtual`. |
| AutoHighlight | Hard-coded departments | 11 `{ label, value }` items | Input filters with case-insensitive contains | No change. |
| InlineAutocomplete | Hard-coded sea creatures | 6 `{ label, value }` items | Input filters with starts-with | No change. |

## Sections / Structure
- Meta differences: None. Both stories use `title: 'Components / Combobox'` and no args, argTypes, parameters, tags, or decorators at meta level.
- Decorator differences: React re-exports example components directly. Angular uses per-story `moduleMetadata({ imports: [...] })` with standalone example components.
- Per-story decorators / args / controls: Angular stories have no args or controls and now follow the same export names and ordering as React.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` | `[arkComboboxRoot]`, `[arkComboboxRootProvider]` | Angular root was narrower in spacing/styling contract. | Updated width, max width, color, and gap. |
| Label | `.Label` | `[arkComboboxLabel]` | Missing line-height and user-select behavior. | Added matching typography and user-select. |
| Control/Input | `.Control`, `.Input`, `.Indicators` | `[arkComboboxControl]`, `[arkComboboxInput]`, trigger buttons | Angular controls were inline with simpler input styling. | Updated relative control, full-width input, focus, invalid, disabled, and absolute triggers. |
| Content | `.Content` | `[arkComboboxContent]` | Missing popover background, max-height, scroll, shadow, animation. | Mirrored React content shell and scrollbar treatment. |
| Items | `.Item`, `.ItemText`, `.ItemIndicator` | `[arkComboboxItem]`, `[arkComboboxItemText]`, `[arkComboboxItemIndicator]` | Smaller padding and missing selected color/text truncation. | Updated item spacing, checked color, truncation, and indicator color. |
| Groups | `.ItemGroup`, `.ItemGroupLabel` | `[arkComboboxItemGroup]`, `[arkComboboxItemGroupLabel]` | Group label spacing and letter spacing differed. | Aligned label spacing, uppercase treatment, and group separation. |
| Multiple tags | `.Tags`, `.Tag`, `.TagPlaceholder` | `.combobox-tags`, `.combobox-tag`, `.combobox-tag-placeholder` | Tag spacing and placeholder height differed. | Aligned spacing, colors, and min height. |
| Async status | `.Status`, `.Spinner`, `.ItemTitle`, `.ItemSubtitle` | `.combobox-status`, `.combobox-spinner`, `.combobox-item-title`, `.combobox-item-subtitle` | Missing loading/status styles for new story. | Added status, spinner, and subtitle styles. |
| Field | `field.Root`, `field.HelperText`, `field.ErrorText` | `.combobox-field-root`, `.combobox-field-helper`, `.combobox-field-error` | Angular field root was invalid by default and helper copy differed. | Removed invalid flag, matched helper copy, added field styling. |
| RootProvider button | `button.Root` | `.combobox-button` | Focus button absent. | Added focus button and button styling. |
| Virtual scroller | `.Scroller` | `.combobox-virtual-scroller`, `.combobox-virtual-spacer`, `.combobox-virtual-item` | Story absent. | Added Angular virtual scroller styles. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story list | Missing six React stories; two Angular-only exports visible. | `combobox.stories.tsx` exports 17 stories. | `combobox.stories.ts` | Added missing exports and removed `Controlled`/`Filterable` exports. |
| Basic filtering | Basic did not filter. | `examples/basic.tsx` | `examples/basic.ts` | Converted collection to signal and filtered on input. |
| Multiple selection | Selected items remained in menu. | `examples/multiple.tsx` | `examples/multiple.ts` | Wired `valueChange` and excluded selected items. |
| RootProvider controls | Missing focus button, clear trigger, filtering. | `examples/root-provider.tsx` | `examples/root-provider.ts` | Added focus button, clear trigger, and input filtering. |
| WithField | Invalid by default, helper text mismatch, no clear trigger/filter. | `examples/with-field.tsx` | `examples/with-field.ts` | Aligned helper text, styling, clear trigger, and filtering. |
| Styling | Angular demo CSS was simpler than React module. | `.storybook/modules/combobox.module.css` | `combobox-example-styles.ts` | Mirrored root, input, content, item, status, tag, field, and virtual styles. |
| Missing examples | Context, Creatable, RehydrateValue, HighlightMatchingText, AsyncSearch, Virtualized absent. | React example files | `packages/angular/combobox/examples/` | Added Angular standalone examples. |

## Implementation Plan
1. Align Angular story imports and exports to React order.
2. Add missing Angular standalone examples for React-only stories.
3. Update existing examples where React behavior differed but component APIs already supported it.
4. Expand shared Angular combobox example styles to mirror React CSS modules.
5. Run Angular typecheck/build, Storybook startup, and `git diff --check`.

## Deferred (component-level work)
- None.

## Verification
- [x] Angular package typecheck: `bun run --cwd packages/angular typecheck` passed. This includes `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, `bun run build`, and `bun run scripts/check-forms-isolation.ts`.
- [x] Storybook startup: `bun run --cwd packages/angular storybook` first prompted because port 6006 was occupied, then failed on port 6007 due a missing local Angular babel cache file under `.angular/cache/21.2.11`. After recreating that cache directory, `bun run --cwd packages/angular storybook -- --port 6007` reached "Storybook ready!" at `http://localhost:6007/`; stopped with Ctrl-C.
- [ ] Visual check of each story: not run in browser.
- [ ] Story-related specs: no combobox story-specific specs were added or run.
- [x] Whitespace check: `git diff --check` passed.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align combobox story with react parity`
