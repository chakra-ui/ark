<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronDownIcon } from 'lucide-svelte'

  interface Item {
    label: string
    value: string
    disabled?: boolean
  }

  let value = $state<string[]>([])

  const collection = createListCollection<Item>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
  })

  let selectedItems = $derived.by<Item[]>(() => {
    return collection.items.filter((item) => value.includes(item.value))
  })
</script>

<Select.Root {collection} bind:value>
  <Select.Label>Select Framework</Select.Label>
  <Select.Control>
    <Select.Trigger style="display: flex; align-items: center; gap: 0.5rem">
      <Select.ValueText placeholder="Framework" />
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
          <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
          {#each collection.items as item (item.value)}
            <Select.Item {item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator>✓</Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
  </Portal>
  <Select.HiddenSelect />
</Select.Root>

{#if selectedItems.length > 0}
  <div style="margin-top: 1rem;">
    <p>Selected: {selectedItems.map((item) => item.label).join(', ')}</p>
  </div>
{/if}
