<script lang="ts">
  import { Combobox, useCombobox } from '@ark-ui/svelte/combobox'
  import { Portal } from '@ark-ui/svelte/portal'
  import { createListCollection } from '@ark-ui/svelte/collection'

  const collection = createListCollection({
    items: ['React', 'Solid', 'Svelte', 'Vue'],
  })

  const id = $props.id()
  const combobox = useCombobox({ collection, id })
</script>

<Combobox.RootProvider value={combobox}>
  <Combobox.Label>Framework</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input placeholder="Select a Framework" />
    <Combobox.Trigger>Open</Combobox.Trigger>
    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.List>
          {#each collection.items as item}
            <Combobox.Item {item}>
              <Combobox.ItemText>{item}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          {/each}
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.RootProvider>
