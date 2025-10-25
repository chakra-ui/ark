import { Sizer } from '@ark-ui/solid/sizer'
import { Index, createSignal } from 'solid-js'

export const Basic = () => {
  const [items, setItems] = createSignal(['Item 1', 'Item 2', 'Item 3'])

  const addItem = () => {
    setItems([...items(), `Item ${items().length + 1}`])
  }

  const removeItem = (index: number) => {
    setItems(items().filter((_, i) => i !== index))
  }

  return (
    <div>
      <div class="sizer-controls">
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
          {items().length === 0 ? (
            <div class="sizer-empty">No items. Click "Add Item" to start.</div>
          ) : (
            <ul class="sizer-list">
              <Index each={items()}>
                {(item, index) => (
                  <li class="sizer-list-item">
                    <span>{item()}</span>
                    <button type="button" onClick={() => removeItem(index)} class="sizer-button-remove">
                      Remove
                    </button>
                  </li>
                )}
              </Index>
            </ul>
          )}
        </Sizer.Content>
      </Sizer.Root>
    </div>
  )
}
