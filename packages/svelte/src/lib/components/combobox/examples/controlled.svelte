<script lang="ts">
  import { useListCollection } from '@ark-ui/svelte/collection'
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  let value = $state<string[]>([])

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<div>
  <Combobox.Root {collection} bind:value onInputValueChange={handleInputChange}>
    <Combobox.Label>Framework</Combobox.Label>
    <Combobox.Control>
      <Combobox.Input placeholder="Select framework..." />
      <Combobox.Trigger>Open</Combobox.Trigger>
      <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
    </Combobox.Control>
    <Portal>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.ItemGroup>
            <Combobox.ItemGroupLabel>Frameworks</Combobox.ItemGroupLabel>
            {#each collection().items as item (item)}
              <Combobox.Item {item}>
                <Combobox.ItemText>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
              </Combobox.Item>
            {/each}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Portal>
  </Combobox.Root>
</div>
