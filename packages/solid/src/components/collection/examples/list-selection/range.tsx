import { createListCollection, useListSelection } from '@ark-ui/solid/collection'
import { For } from 'solid-js'
import styles from 'styles/list-selection.module.css'

export const Range = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Solid', value: 'solid' },
    ],
  })

  const selection = useListSelection({
    collection,
    selectionMode: 'multiple',
  })

  const handleItemClick = (value: string, event: MouseEvent) => {
    const firstSelectedValue = selection.firstSelectedValue()
    if (event.shiftKey && firstSelectedValue) {
      selection.extend(firstSelectedValue, value)
    } else if (event.ctrlKey || event.metaKey) {
      selection.toggle(value)
    } else {
      selection.replace(value)
    }
  }

  return (
    <div class={styles.Root}>
      <output>Selected: {selection.selectedValues().join(', ') || 'None'}</output>
      <For each={collection.items}>
        {(item) => (
          <label
            class={styles.Item}
            data-selected={selection.isSelected(item.value) || undefined}
            onClick={(e) => handleItemClick(item.value, e)}
          >
            <input type="checkbox" class={styles.Checkbox} checked={selection.isSelected(item.value)} />
            <span class={styles.ItemText}>{item.label}</span>
          </label>
        )}
      </For>
      <p class={styles.HelperText}>Click to select • Shift+Click for range • Cmd/Ctrl+Click to toggle</p>
    </div>
  )
}
