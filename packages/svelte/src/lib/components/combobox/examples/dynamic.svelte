<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { Portal } from '@ark-ui/svelte/portal'

  const suggestList = ['gmail.com', 'yahoo.com', 'ark-ui.com']

  const { collection, set } = useListCollection<string>({
    initialItems: [],
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    if (details.reason === 'input-change') {
      const items = suggestList.map((item) => `${details.inputValue}@${item}`)
      set(items)
    }
  }
</script>

<Combobox.Root {collection} onInputValueChange={handleInputChange}>
  <Combobox.Label>Framework</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input />
    <Combobox.Trigger>Open</Combobox.Trigger>
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
