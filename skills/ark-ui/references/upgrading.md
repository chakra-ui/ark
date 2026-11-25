# Upgrading from v5

Most models learned Ark v5, so v5 code is the most common mistake in a v6 project. Check this list when the project has
`@ark-ui/*` 6.x. The full guide is at `{docs}/docs/{framework}/overview/upgrade-guide.md`.

## Start with the codemods

```bash
npx @ark-ui/codemod list
npx @ark-ui/codemod css/data-attributes "src/**/*.{css,ts,tsx,vue,svelte}" --dry
npx @ark-ui/codemod react/field-indicator "src/**/*.tsx" --dry
```

Transforms exist per framework (`react/`, `solid/`, `vue/`, `svelte/`): `as-child-to-render`, `carousel-props`,
`floating-panel-placement`, `image-cropper-placement`, `tabs-virtual-focus`, `popover-portalled`, `tags-input-editable`,
`pin-input-count` and `field-indicator`. Commit first: they won't run on a dirty tree. Add `--cross-file` when parts
come through barrels or wrappers.

## v5 habits to avoid

| v5                                                           | v6                                                                    |
| ------------------------------------------------------------ | --------------------------------------------------------------------- |
| `[data-scope="dialog"][data-part="content"]`                 | `[data-dialog-content]`                                               |
| `asChild` in new code                                        | `render`, which also gives you the part's state                       |
| `z-index` on the content, or Dialog's `--z-index`            | `z-index: calc(base + var(--layer-index))` on the positioner          |
| Items directly inside Select, Combobox or Listbox `Content`  | Items inside the `List` part; `Empty` outside it                      |
| `composite={false}` (Combobox, Menu, Select)                 | `popupType="dialog"`                                                  |
| Combobox `disableLayer`                                      | `inline`                                                              |
| `Field.RequiredIndicator`                                    | `Field.Indicator type="required"`                                     |
| `[data-part="input"]` on a field control                     | `[data-field-control]`                                                |
| Popover `portalled`                                          | wrap the positioner in `Portal`                                       |
| NumberInput `details.valueAsNumber`                          | `details.value`, a `number` or `null`                                 |
| PinInput `length`                                            | `count`                                                               |
| Steps `count`, `step`, `onStepChange`, `index`               | `items`, `value`, `onValueChange`, `value` on parts                   |
| TreeView `Branch`, `BranchControl`, `Item`                   | `NodeGroup`, `Node`                                                   |
| Toggle `[data-state="on"]`                                   | `[data-pressed]`                                                      |
| `getPrevTriggerProps()`, `goToPrevPage()`, `selectPrev()`    | `getPreviousTriggerProps()`, `goToPreviousPage()`, `selectPrevious()` |
| Accordion `loopFocus`                                        | removed; `collapsible` now defaults to `true`                         |
| TagsInput editing tags on double-click by default            | pass `editable`                                                       |
| Carousel `slideCount`                                        | `count`                                                               |
| `useCollator()()`, `filters().contains` (Solid, Svelte, Vue) | `collator.compare`, `const { contains } = useFilter()`                |
| Solid 1, `jsxImportSource: "solid-js"`                       | Solid 2, `jsxImportSource: "@solidjs/web"`                            |
| Svelte `useDialog()` with no id                              | `useDialog({ id: $props.id() })`                                      |

When a name from memory doesn't typecheck, look it up in the upgrade guide before guessing another.
