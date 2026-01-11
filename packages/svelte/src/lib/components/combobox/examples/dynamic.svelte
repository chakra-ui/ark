<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

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

<Combobox.Root class={styles.Root} {collection} onInputValueChange={handleInputChange}>
  <Combobox.Label class={styles.Label}>Email</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. john" />
    <div class={styles.Indicators}>
      <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
    </div>
  </Combobox.Control>
  <Portal>
    <Combobox.Positioner>
      <Combobox.Content class={styles.Content}>
        {#each collection().items as item (item)}
          <Combobox.Item class={styles.Item} {item}>
            <Combobox.ItemText class={styles.ItemText}>{item}</Combobox.ItemText>
            <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
