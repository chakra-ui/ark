<script lang="ts">
  // biome-ignore lint/style/useImportType: <explanation>
  import { Combobox } from '@ark-ui/svelte/combobox'
  import { useListCollection } from '@ark-ui/svelte/collection'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
    filter: (...args) => filters().contains(...args),
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root {collection} onInputValueChange={handleInputChange}>
  <Combobox.Context>
    {#snippet render(combobox)}
      <p>Value: {JSON.stringify(combobox().value)}</p>
    {/snippet}
  </Combobox.Context>
  <Combobox.Label>Framework</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input />
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
