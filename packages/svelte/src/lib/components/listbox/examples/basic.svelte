<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })
</script>

<Listbox.Root {collection}>
  <Listbox.Label>Select your Framework</Listbox.Label>
  <Listbox.Content>
    {#each collection.items as item}
      <Listbox.Item {item}>
        <Listbox.ItemText>{item}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.Root>
