import { createListCollection, useListSelection } from '@ark-ui/react/collection'

export const Range = () => {
  const collection = createListCollection({
    items: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'preact', label: 'Preact' },
      { value: 'qwik', label: 'Qwik' },
      { value: 'lit', label: 'Lit' },
    ],
  })

  const selection = useListSelection({
    collection,
    selectionMode: 'multiple',
  })

  const handleItemClick = (value: string, event: React.MouseEvent) => {
    if (event.shiftKey && selection.firstSelectedValue) {
      // Extend selection from first selected to clicked item
      selection.extend(selection.firstSelectedValue, value)
    } else if (event.ctrlKey || event.metaKey) {
      // Toggle individual item
      selection.toggle(value)
    } else {
      // Replace selection with clicked item
      selection.replace(value)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>Click to select single item</li>
          <li>Ctrl/Cmd + Click to toggle individual items</li>
          <li>Shift + Click to select range from first selected item</li>
        </ul>
      </div>

      {collection.items.map((item) => (
        <label
          key={item.value}
          style={{
            backgroundColor: selection.isSelected(item.value) ? '#e2e8f0' : 'transparent',
            padding: '8px 12px',
            cursor: 'pointer',
            userSelect: 'none',
            border: '1px solid #e2e8f0',
            marginBottom: 2,
          }}
        >
          <input
            type="checkbox"
            checked={selection.isSelected(item.value)}
            onClick={(e) => handleItemClick(item.value, e)}
          />
          {item.label}
        </label>
      ))}
    </div>
  )
}
