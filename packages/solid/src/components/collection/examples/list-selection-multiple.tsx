import { createListCollection, useListSelection } from '@ark-ui/solid/collection'
import { For } from 'solid-js'

export const ListSelectionMultiple = () => {
  const collection = createListCollection({
    items: ['React', 'Vue', 'Angular', 'Svelte', 'Solid'],
  })

  const selection = useListSelection({
    collection,
    selectionMode: 'multiple',
  })

  const handleSelectAll = () => {
    if (selection.isAllSelected()) {
      selection.clear()
    } else {
      selection.setSelectedValues(collection.getValues())
    }
  }

  return (
    <div>
      <div style={{ 'margin-bottom': '16px', display: 'flex', 'align-items': 'center', gap: '16px' }}>
        <button onClick={handleSelectAll}>{selection.isAllSelected() ? 'Deselect All' : 'Select All'}</button>
        <span>
          {selection.selectedValues().length} of {collection.items.length} selected
        </span>
      </div>

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
