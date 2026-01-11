<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  let selectedItems: { label: string; value: string }[] = $state([])

  const { collection, filter, remove } = useListCollection({
    initialItems: [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Python', value: 'python' },
      { label: 'Go', value: 'go' },
      { label: 'Rust', value: 'rust' },
      { label: 'Java', value: 'java' },
    ],
    filter: filters().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    selectedItems = details.items
    remove(...details.value)
  }
</script>

<Combobox.Root
  class={styles.Root}
  {collection}
  onInputValueChange={handleInputChange}
  onValueChange={handleValueChange}
  multiple
>
  <Combobox.Label class={styles.Label}>Skills</Combobox.Label>
  <div class={styles.Tags}>
    {#if selectedItems.length === 0}
      <span class={styles.TagPlaceholder}>None selected</span>
    {/if}
    {#each selectedItems as item (item.value)}
      <span class={styles.Tag}>{item.label}</span>
    {/each}
  </div>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. JavaScript" />
    <div class={styles.Indicators}>
      <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={styles.Content}>
        <Combobox.Empty class={styles.Item}>No skills found</Combobox.Empty>
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
