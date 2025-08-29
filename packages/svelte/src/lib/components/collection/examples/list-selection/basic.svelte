<script lang="ts">
  import { useListSelection, createListCollection } from '@ark-ui/svelte/collection'

  const collection = createListCollection({
    items: ['React', 'Vue', 'Angular'],
  })

  const selection = useListSelection({
    collection,
  })
</script>

<div>
  <pre>{JSON.stringify(selection.selectedValues())}</pre>
  {#each collection.items as item (item)}
    <label
      style:display="flex"
      style:align-items="center"
      style:gap="8px"
      style:user-select="none"
      style:background-color={selection.isSelected(item) ? 'lightblue' : 'white'}
    >
      <input type="checkbox" checked={selection.isSelected(item)} onchange={() => selection.select(item)} />
      <span>{item}</span>
    </label>
  {/each}
</div>
