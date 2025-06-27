<script lang="ts">
  import { Listbox, createListCollection, type ListboxValueChangeDetails } from '@ark-ui/svelte/listbox'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
  let value = $state(['React'])

  function handleValueChange(e: ListboxValueChangeDetails) {
    value = e.value
  }
</script>

<Listbox.Root {value} onValueChange={handleValueChange} {collection}>
  <Listbox.Label>Select your Framework</Listbox.Label>
  <Listbox.Content>
    {#each collection.items as item (item)}
      <Listbox.Item {item}>
        <Listbox.ItemText>{item}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.Root>
