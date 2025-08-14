<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'

  const filters = useFilter({ sensitivity: 'base' })

  let selectedValue: string[] = $state([])

  const { collection, filter, remove } = useListCollection({
    initialItems: ['React', 'Solid', 'Vue', 'Svelte'],
    filter: filters().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    selectedValue = details.value
    remove(...details.value)
  }
</script>

<Combobox.Root {collection} onInputValueChange={handleInputChange} onValueChange={handleValueChange} multiple>
  <Combobox.Label>Frameworks</Combobox.Label>
  <Combobox.Control>
    <div class="combobox-tag-group">
      {#each selectedValue as value (value)}
        <div class="combobox-tag">{value}</div>
      {/each}
    </div>
    <Combobox.Input />
    <Combobox.Trigger>Open</Combobox.Trigger>
    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content>
        {#each collection().items as item (item)}
          <Combobox.Item {item}>
            <Combobox.ItemText>{item}</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>

<style>
  .combobox-tag {
    display: inline-block;
    padding: 0.25rem;
    border: 1px solid gray;
    font-family: monospace;
  }

  .combobox-tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
