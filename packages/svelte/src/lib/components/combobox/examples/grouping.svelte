<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  const initialItems = [
    { label: 'React', value: 'react', type: 'JS' },
    { label: 'Solid', value: 'solid', type: 'JS' },
    { label: 'Vue', value: 'vue', type: 'JS' },
    { label: 'Svelte', value: 'svelte', type: 'JS' },
    { label: 'Panda', value: 'panda', type: 'CSS' },
    { label: 'Tailwind', value: 'tailwind', type: 'CSS' },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
    groupBy: (item) => item.type,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<div>
  <Combobox.Root {collection} onInputValueChange={handleInputChange}>
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input placeholder="Select framework..." />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Portal>
      <Combobox.Positioner>
        <Combobox.Content>
          {#each collection().group() as [type, group]}
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>{type}</Combobox.ItemGroupLabel>
              {#each group as item}
                <Combobox.Item {item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              {/each}
            </Combobox.ItemGroup>
          {/each}
        </Combobox.Content>
      </Combobox.Positioner>
    </Portal>
  </Combobox.Root>
</div>
