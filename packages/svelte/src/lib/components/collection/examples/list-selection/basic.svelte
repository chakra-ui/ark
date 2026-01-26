<script lang="ts">
  import { createListCollection, useListSelection } from '@ark-ui/svelte/collection'
  import styles from 'styles/list-selection.module.css'

  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })

  const selection = useListSelection({ collection })
</script>

<div class={styles.Root}>
  <output>Selected: {selection.selectedValues().join(', ') || 'None'}</output>
  {#each collection.items as item (item.value)}
    <label class={styles.Item} data-selected={selection.isSelected(item.value) || undefined}>
      <input
        type="checkbox"
        class={styles.Checkbox}
        checked={selection.isSelected(item.value)}
        onchange={() => selection.select(item.value)}
      />
      <span class={styles.ItemText}>{item.label}</span>
    </label>
  {/each}
</div>
