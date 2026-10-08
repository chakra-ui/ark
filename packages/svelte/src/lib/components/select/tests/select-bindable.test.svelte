<script lang="ts">
  import { Select, createListCollection } from '../index.ts'

  const collection = createListCollection({ items: ['React', 'Solid', 'Vue'] })

  let open = $state(false)
  let highlightedValue = $state<string | null>(null)
</script>

<Select.Root {collection} bind:open bind:highlightedValue>
  <Select.Label>Framework</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select" />
    </Select.Trigger>
  </Select.Control>
  <Select.Positioner>
    <Select.Content>
      {#each collection.items as item (item)}
        <Select.Item {item}>
          <Select.ItemText>{item}</Select.ItemText>
        </Select.Item>
      {/each}
    </Select.Content>
  </Select.Positioner>
</Select.Root>
<output data-testid="open">{String(open)}</output>
<output data-testid="highlighted">{String(highlightedValue)}</output>
<button type="button" onclick={() => (open = false)}>close</button>
