<script lang="ts">
  import { Listbox, createListCollection, useListbox } from '@ark-ui/svelte/listbox'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  const id = $props.id()
  const listbox = useListbox({ collection, id })
</script>

<Listbox.RootProvider value={listbox}>
  <Listbox.Label>Select your Framework</Listbox.Label>
  <Listbox.Content>
    {#each collection.items as item}
      <Listbox.Item {item}>
        <Listbox.ItemText>{item}</Listbox.ItemText>
        <Listbox.ItemIndicator />
      </Listbox.Item>
    {/each}
  </Listbox.Content>
</Listbox.RootProvider>

<div>
  <p>Selected: {JSON.stringify(listbox().value)}</p>
  <button onclick={() => listbox().clearValue()}>Clear Selection</button>
</div>
