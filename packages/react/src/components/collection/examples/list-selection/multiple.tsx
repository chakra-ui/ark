import { createListCollection, useListSelection } from '@ark-ui/react/collection'

export const Multiple = () => {
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
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={handleSelectAll}>{selection.isAllSelected() ? 'Deselect All' : 'Select All'}</button>
        <span>
          {selection.selectedValues.length} of {collection.items.length} selected
        </span>
      </div>

      {collection.items.map((item) => (
        <label
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            userSelect: 'none',
            backgroundColor: selection.isSelected(item) ? 'lightblue' : 'white',
          }}
        >
          <input type="checkbox" checked={selection.isSelected(item)} onChange={() => selection.select(item)} />
          <span>{item}</span>
        </label>
      ))}
    </div>
  )
}
