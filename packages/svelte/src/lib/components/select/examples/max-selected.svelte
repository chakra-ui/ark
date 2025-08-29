<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  // biome-ignore lint/style/useImportType: intentional
  import { Select, createListCollection } from '@ark-ui/svelte/select'
  import { ChevronDownIcon } from 'lucide-svelte'

  const items = ['React', 'Solid', 'Vue', 'Svelte']

  let value = $state<string[]>([])
  const maxSelected = 2

  const hasReachedMax = (value: string[]) => value.length >= maxSelected

  const collection = $derived(
    createListCollection({
      items: items.map((item) => ({
        label: item,
        value: item,
        disabled: hasReachedMax(value) && !value.includes(item),
      })),
    }),
  )

  const handleValueChange = (details: Select.ValueChangeDetails) => {
    if (hasReachedMax(value) && details.value.length) return
    value = details.value
  }
</script>

<Select.Root {collection} multiple {value} onValueChange={handleValueChange}>
  <Select.Label>Framework</Select.Label>
  <Select.Control>
    <Select.Trigger>
      <Select.ValueText placeholder="Select a Framework" />
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
