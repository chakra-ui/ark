import { createListCollection, useListSelection } from '@ark-ui/react/collection'
import styles from 'styles/list-selection.module.css'

export const Multiple = () => {
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

  const handleSelectAll = () => {
    if (selection.isAllSelected()) {
      selection.clear()
    } else {
      selection.setSelectedValues(collection.getValues())
    }
  }

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <span className={styles.Count}>
          {selection.selectedValues.length} of {collection.items.length} selected
        </span>
        <button type="button" className={styles.SelectAllButton} onClick={handleSelectAll}>
          {selection.isAllSelected() ? 'Deselect all' : 'Select all'}
        </button>
      </div>
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
