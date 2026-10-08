<script lang="ts">
  import { Combobox, createListCollection } from '../index.ts'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  let highlightedValue = $state<string | null>(null)
</script>

<Combobox.Root {collection} bind:highlightedValue>
  <Combobox.Label>Framework</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input />
    <Combobox.Trigger>Open</Combobox.Trigger>
  </Combobox.Control>
  <Combobox.Positioner>
    <Combobox.Content>
      {#each collection.items as item (item)}
        <Combobox.Item {item}>
          <Combobox.ItemText>{item}</Combobox.ItemText>
        </Combobox.Item>
      {/each}
    </Combobox.Content>
  </Combobox.Positioner>
</Combobox.Root>
<output data-testid="highlighted">{String(highlightedValue)}</output>
