<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronDownIcon } from 'lucide-svelte'

  const collection = createListCollection({
    items: ['Apple', 'Banana', 'Cherry', 'Date'],
  })
</script>

<Select.Root {collection}>
  <Select.Label>Select Fruits</Select.Label>
  <Select.Control>
    <Select.Trigger style="display: flex; align-items: center; gap: 0.5rem">
      <Select.ValueText placeholder="Fruits" />
      <Select.Indicator>
        <ChevronDownIcon />
      </Select.Indicator>
    </Select.Trigger>
    <Select.ClearTrigger>Clear</Select.ClearTrigger>
  </Select.Control>
  <Portal>
    <Select.Positioner>
      <Select.Content>
        <Select.ItemGroup>
          <Select.ItemGroupLabel>Fruits</Select.ItemGroupLabel>
          {#each collection.items as item}
            <Select.Item {item}>
              <Select.ItemText>{item}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>
