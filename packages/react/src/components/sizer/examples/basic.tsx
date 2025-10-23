import { Sizer } from '@ark-ui/react/sizer'
import { useState } from 'react'

export const Basic = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="sizer-controls">
        <button type="button" onClick={addItem}>
          Add Item
        </button>
        <button type="button" onClick={() => setItems([])}>
          Clear All
        </button>
      </div>

      <Sizer.Root
        style={{
          height: 'var(--sizer-height)',
          transition: 'height 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <Sizer.Content>
          {items.length === 0 ? (
            <div className="sizer-empty">No items. Click "Add Item" to start.</div>
          ) : (
            <ul className="sizer-list">
              {items.map((item, index) => (
                <li key={index} className="sizer-list-item">
                  <span>{item}</span>
                  <button type="button" onClick={() => removeItem(index)} className="sizer-button-remove">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Sizer.Content>
      </Sizer.Root>
    </div>
  )
}
