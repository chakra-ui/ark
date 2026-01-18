<script lang="ts">
  import { createListCollection, useListSelection } from '@ark-ui/svelte/collection'
  import styles from 'styles/list-selection.module.css'

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
</script>

<div class={styles.Root}>
  <output>Selected: {selection.selectedValues().join(', ') || 'None'}</output>
  {#each collection.items as item (item.value)}
    <label class={styles.Item} data-selected={selection.isSelected(item.value) || undefined}>
      <input
        type="checkbox"
        class={styles.Checkbox}
        checked={selection.isSelected(item.value)}
        onclick={(e) => handleItemClick(item.value, e)}
        readonly
      />
      <span class={styles.ItemText}>{item.label}</span>
    </label>
  {/each}
  <p class={styles.HelperText}>Click to select • Shift+Click for range • Cmd/Ctrl+Click to toggle</p>
</div>
