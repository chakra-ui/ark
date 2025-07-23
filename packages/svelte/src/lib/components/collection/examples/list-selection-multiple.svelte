<script lang="ts">
  import { createListCollection, useListSelection } from '@ark-ui/svelte/collection'

  const collection = createListCollection({
    items: ['React', 'Vue', 'Angular', 'Svelte', 'Solid'],
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
</script>

<div>
  <div style="margin-bottom: 16px; display: flex; align-items: center; gap: 16px;">
    <button onclick={handleSelectAll}>
      {selection.isAllSelected() ? 'Deselect All' : 'Select All'}
    </button>
    <span>
      {selection.selectedValues().length} of {collection.items.length} selected
    </span>
  </div>

  {#each collection.items as item (item)}
    <label
      style="display: flex; align-items: center; gap: 8px; user-select: none;"
      style:background-color={selection.isSelected(item) ? 'lightblue' : 'white'}
    >
      <input type="checkbox" checked={selection.isSelected(item)} onchange={() => selection.select(item)} />
      <span>{item}</span>
    </label>
  {/each}
</div>
