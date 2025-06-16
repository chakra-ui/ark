<script lang="ts">
  import { Listbox, createListCollection } from '@ark-ui/svelte/listbox'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  let value = $state(['React'])
</script>

<Listbox.Root {collection} bind:value selectionMode="multiple">
  <Listbox.Label>Select your Frameworks (Multiple)</Listbox.Label>
  <Listbox.ValueText placeholder="Select frameworks..." />
  <Listbox.Content>
    {#each collection.items as item}
      <Listbox.Item {item}>
        <Listbox.ItemText>{item}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.Root>

<div>
  <p>Selected: {JSON.stringify(value)}</p>
</div>
