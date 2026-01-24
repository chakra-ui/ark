import { createListCollection, useListSelection } from '@ark-ui/react/collection'
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

  const handleItemClick = (value: string, event: React.MouseEvent) => {
    if (event.shiftKey && selection.firstSelectedValue) {
      selection.extend(selection.firstSelectedValue, value)
    } else if (event.ctrlKey || event.metaKey) {
      selection.toggle(value)
    } else {
      selection.replace(value)
    }
  }

  return (
    <div className={styles.Root}>
      <output>Selected: {selection.selectedValues.join(', ') || 'None'}</output>
      {collection.items.map((item) => (
        <label
          key={item.value}
          className={styles.Item}
          data-selected={selection.isSelected(item.value) || undefined}
          onClick={(e) => handleItemClick(item.value, e)}
        >
          <input type="checkbox" className={styles.Checkbox} checked={selection.isSelected(item.value)} />
          <span className={styles.ItemText}>{item.label}</span>
        </label>
      ))}
      <p className={styles.HelperText}>Click to select • Shift+Click for range • Cmd/Ctrl+Click to toggle</p>
    </div>
  )
}
