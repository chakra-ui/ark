<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
      { label: 'Elderberry', value: 'elderberry' },
      { label: 'Fig', value: 'fig' },
    ],
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root class={styles.Root} {collection} onInputValueChange={handleInputChange}>
  <Combobox.Label class={styles.Label}>Fruit</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. Apple" />
    <div class={styles.Indicators}>
      <Combobox.ClearTrigger class={styles.ClearTrigger}>Clear</Combobox.ClearTrigger>
      <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={styles.Content}>
        <Combobox.Empty class={styles.Item}>No results found</Combobox.Empty>
        {#each collection().items as item (item.value)}
          <Combobox.Item class={styles.Item} {item}>
            <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
            <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
