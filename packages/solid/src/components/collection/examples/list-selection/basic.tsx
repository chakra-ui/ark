import { createListCollection, useListSelection } from '@ark-ui/solid/collection'
import { For } from 'solid-js'
import styles from 'styles/list-selection.module.css'

export const Basic = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })

  const selection = useListSelection({ collection })

  return (
    <div class={styles.Root}>
      <output>Selected: {selection.selectedValues().join(', ') || 'None'}</output>
      <For each={collection.items}>
        {(item) => (
          <label class={styles.Item} data-selected={selection.isSelected(item.value) || undefined}>
            <input
              type="checkbox"
              class={styles.Checkbox}
              checked={selection.isSelected(item.value)}
              onChange={() => selection.select(item.value)}
            />
            <span class={styles.ItemText}>{item.label}</span>
          </label>
        )}
      </For>
    </div>
  )
}
