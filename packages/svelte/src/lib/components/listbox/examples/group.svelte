<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'

  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react', type: 'JS' },
      { label: 'Solid', value: 'solid', type: 'JS' },
      { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Svelte', value: 'svelte', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
      { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
    ],
    groupBy: (item) => item.type,
  })
</script>

<Listbox.Root {collection}>
  <Listbox.Label>Select your Frameworks</Listbox.Label>
  <Listbox.Content>
    {#each collection.group() as [type, group]}
      <Listbox.ItemGroup>
        <Listbox.ItemGroupLabel>{type}</Listbox.ItemGroupLabel>
        {#each group as item}
          <Listbox.Item {item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        {/each}
      </Listbox.ItemGroup>
    {/each}
  </Listbox.Content>
</Listbox.Root>
