import { createListCollection, useListSelection } from '@ark-ui/solid/collection'
import { For } from 'solid-js'

export const ListSelectionRange = () => {
  const items = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'preact', label: 'Preact' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'lit', label: 'Lit' },
  ]

  const collection = createListCollection({ items })
  const selection = useListSelection({
    collection,
    selectionMode: 'multiple',
  })

  const handleItemClick = (value: string, event: MouseEvent) => {
    const firstSelectedValue = selection.firstSelectedValue()
    if (event.shiftKey && firstSelectedValue) {
      // Extend selection from first selected to clicked item
      selection.extend(firstSelectedValue, value)
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
      <div style={{ 'margin-bottom': '16px' }}>
        <p>
          <strong>Instructions:</strong>
        </p>
        <ul style={{ margin: '8px 0', 'padding-left': '20px' }}>
          <li>Click to select single item</li>
          <li>Ctrl/Cmd + Click to toggle individual items</li>
          <li>Shift + Click to select range from first selected item</li>
        </ul>
      </div>

      <For each={collection.items}>
        {(item) => (
          <label
            style={{
              'background-color': selection.isSelected(item.value) ? '#e2e8f0' : 'transparent',
              padding: '8px 12px',
              cursor: 'pointer',
              'user-select': 'none',
              border: '1px solid #e2e8f0',
              'margin-bottom': '2px',
            }}
          >
            <input
              type="checkbox"
              checked={selection.isSelected(item.value)}
              onClick={(e) => handleItemClick(item.value, e)}
            />
            {item.label}
          </label>
        )}
      </For>
    </div>
  )
}
