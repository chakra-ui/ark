import { createListCollection, useListSelection } from '@ark-ui/solid/collection'
import { For } from 'solid-js'

export const ListSelection = () => {
  const collection = createListCollection({
    items: ['React', 'Vue', 'Angular'],
  })

  const selection = useListSelection({
    collection,
  })

  return (
    <div>
      <pre>{JSON.stringify(selection.selectedValues())}</pre>
      <For each={collection.items}>
        {(item) => (
          <label
            style={{
              display: 'flex',
              'align-items': 'center',
              gap: '8px',
              'user-select': 'none',
              'background-color': selection.isSelected(item) ? 'lightblue' : 'white',
            }}
          >
            <input type="checkbox" checked={selection.isSelected(item)} onChange={() => selection.select(item)} />
            <span>{item}</span>
          </label>
        )}
      </For>
    </div>
  )
}
