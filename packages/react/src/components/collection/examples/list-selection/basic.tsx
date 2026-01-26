import { createListCollection, useListSelection } from '@ark-ui/react/collection'
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
    <div className={styles.Root}>
      <output>Selected: {selection.selectedValues.join(', ') || 'None'}</output>
      {collection.items.map((item) => (
        <label key={item.value} className={styles.Item} data-selected={selection.isSelected(item.value) || undefined}>
          <input
            type="checkbox"
            className={styles.Checkbox}
            checked={selection.isSelected(item.value)}
            onChange={() => selection.select(item.value)}
          />
          <span className={styles.ItemText}>{item.label}</span>
        </label>
      ))}
    </div>
  )
}
