<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { Highlight } from '@ark-ui/svelte/highlight'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root {collection} onInputValueChange={handleInputChange}>
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
              <Combobox.ItemText>
                <Combobox.Context>
                  {#snippet render(context)}
                    <Highlight text={item} query={context().inputValue} ignoreCase />
                  {/snippet}
                </Combobox.Context>
              </Combobox.ItemText>
            </Combobox.Item>
          {/each}
        </Combobox.ItemGroup>
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
