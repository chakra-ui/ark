<script lang="ts">
  import { Combobox, useCombobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import button from 'styles/button.module.css'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const initialItems = [
    { label: 'Designer', value: 'designer' },
    { label: 'Developer', value: 'developer' },
    { label: 'Product Manager', value: 'pm' },
    { label: 'Data Scientist', value: 'data-scientist' },
    { label: 'DevOps Engineer', value: 'devops' },
    { label: 'Marketing Lead', value: 'marketing' },
  ]

  const { collection, filter } = useListCollection({
    initialItems,
    filter(itemString, filterText) {
      return filters().contains(itemString, filterText)
    },
  })

  const id = $props.id()
  const combobox = useCombobox({
    get collection() {
      return collection()
    },
    id,
    onInputValueChange(details) {
      filter(details.inputValue)
    },
  })
</script>

<div class="stack">
  <button class={button.Root} onclick={() => combobox().focus()}>Focus</button>

  <Combobox.RootProvider class={styles.Root} value={combobox}>
    <Combobox.Label class={styles.Label}>Job Title</Combobox.Label>
    <Combobox.Control class={styles.Control}>
      <Combobox.Input class={styles.Input} placeholder="e.g. Designer" />
      <div class={styles.Indicators}>
        <Combobox.ClearTrigger class={styles.ClearTrigger}>Clear</Combobox.ClearTrigger>
        <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
      </div>
    </Combobox.Control>
    <Portal>
      <Combobox.Positioner>
        <Combobox.Content class={styles.Content}>
          {#each collection().items as item (item.value)}
            <Combobox.Item class={styles.Item} {item}>
              <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
              <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
            </Combobox.Item>
          {/each}
        </Combobox.Content>
      </Combobox.Positioner>
    </Portal>
  </Combobox.RootProvider>
</div>
