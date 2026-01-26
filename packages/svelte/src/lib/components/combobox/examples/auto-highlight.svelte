<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' },
      { label: 'Finance', value: 'finance' },
      { label: 'Human Resources', value: 'hr' },
      { label: 'Operations', value: 'operations' },
      { label: 'Product', value: 'product' },
      { label: 'Customer Success', value: 'customer-success' },
      { label: 'Legal', value: 'legal' },
      { label: 'Information Technology', value: 'information-technology' },
      { label: 'Design', value: 'design' },
    ],
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }
</script>

<Combobox.Root class={styles.Root} {collection} onInputValueChange={handleInputChange} inputBehavior="autohighlight">
  <Combobox.Label class={styles.Label}>Department</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. Engineering" />
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
