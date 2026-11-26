# Collections

Select, Combobox, Listbox and Tree View take a `collection`, not an `items` array. The collection gives the machine the
order, values, labels and disabled state it needs for keyboard navigation and typeahead.

## List collections

```tsx
import { Select, createListCollection } from '@ark-ui/react/select'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue', disabled: true },
  ],
})

export const Items = () => (
  <Select.List>
    {collection.items.map((item) => (
      <Select.Item key={item.value} item={item}>
        <Select.ItemText>{item.label}</Select.ItemText>
      </Select.Item>
    ))}
  </Select.List>
)
```

Pass `collection` to `Select.Root`, and render the items inside `Select.Content`.

- Items render inside the `List` part, not directly in `Content`. `Empty` sits outside `List`.
- Items default to `label`, `value` and `disabled` fields. For other shapes pass `itemToString`, `itemToValue` (return a
  string) and `isItemDisabled`.
- Values are always string arrays, even for a single select: `value={['react']}`.
- Group items with `groupBy`. `collection.group()` returns `[key, items]` pairs to render with `ItemGroup` and
  `ItemGroupLabel`.

## Filtering

For a Combobox, keep the collection in `useListCollection` and filter it from `onInputValueChange`:

```tsx
import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'

export const Fruits = (props: { initialItems: { label: string; value: string }[] }) => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({ initialItems: props.initialItems, filter: contains })

  return (
    <Combobox.Root collection={collection} onInputValueChange={(details) => filter(details.inputValue)}>
      {/* … */}
    </Combobox.Root>
  )
}
```

`useListCollection` returns `collection` as an accessor in Solid (`collection().items`) and as a ref in Vue
(`collection.value` in script, `collection` in the template). `useFilter` and `useCollator` return values, not
accessors, in every framework.

## Tree collections

```tsx
import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'

const collection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: { id: 'root', name: '', children: nodes },
})
```

Render it recursively with `TreeView.Node`, `TreeView.NodeGroup` and `TreeView.NodeGroupContent`. v5's `Branch` and
`Item` parts are gone.

## Loading data

`useAsyncList` from `@ark-ui/{framework}/collection` loads, filters, sorts and paginates remote data. Its `load` returns
`{ items, cursor }`. On web it's `createAsyncList` from `@ark-ui/web/async-list`.

## Long lists

Virtualize with `ListVirtualizer`, `GridVirtualizer` or `WindowVirtualizer` from `@ark-ui/{framework}/virtualizer`.
Compose them into Select, Combobox, Listbox or Tree View through `render`, so keyboard navigation and screen-reader
counts keep working. When the count changes after filtering, update the virtualizer the way your framework's guide
shows. Read `{docs}/docs/{framework}/guides/virtualization.md` first: it has the composed example for each component.
