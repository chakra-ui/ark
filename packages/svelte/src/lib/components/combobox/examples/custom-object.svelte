<script lang="ts">
  // biome-ignore lint/style/useImportType: <explanation>
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { country: 'United States', code: 'US', flag: '🇺🇸' },
      { country: 'Canada', code: 'CA', flag: '🇨🇦' },
      { country: 'Australia', code: 'AU', flag: '🇦🇺' },
    ],
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root {collection} onInputValueChange={handleInputChange}>
  <Combobox.Control>
    <Combobox.Input />
    <Combobox.Trigger>Open</Combobox.Trigger>
    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content>
        <Combobox.ItemGroup>
          <Combobox.ItemGroupLabel>Countries</Combobox.ItemGroupLabel>
          {#each collection().items as item (item.code)}
            <Combobox.Item {item}>
              <Combobox.ItemText>{item.country}</Combobox.ItemText>
              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          {/each}
        </Combobox.ItemGroup>
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>