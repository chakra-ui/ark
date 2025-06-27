<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'

  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Svelte', value: 'svelte', disabled: true },
      { label: 'Vue', value: 'vue' },
    ],
  })
</script>

<Listbox.Root {collection}>
  <Listbox.Label>Select your Framework</Listbox.Label>
  <Listbox.Content>
    {#each collection.items as item (item.value)}
      <Listbox.Item {item}>
        <Listbox.ItemText>{item.label}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.Root>
