<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { Combobox, useListCollection } from '@ark-ui/svelte/combobox'
  import { Highlight } from '@ark-ui/svelte/highlight'
  import { useFilter } from '@ark-ui/svelte/locale'
  import { Portal } from '@ark-ui/svelte/portal'
  import styles from 'styles/combobox.module.css'

  const filters = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'John Smith', value: 'john-smith' },
      { label: 'Jane Doe', value: 'jane-doe' },
      { label: 'Bob Johnson', value: 'bob-johnson' },
      { label: 'Alice Williams', value: 'alice-williams' },
      { label: 'Charlie Brown', value: 'charlie-brown' },
      { label: 'Diana Ross', value: 'diana-ross' },
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
  <Combobox.Label class={styles.Label}>Assignee</Combobox.Label>
  <Combobox.Control class={styles.Control}>
    <Combobox.Input class={styles.Input} placeholder="e.g. John Smith" />
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
            <Combobox.ItemText class={styles.ItemText}>
              <Combobox.Context>
                {#snippet render(context)}
                  <Highlight text={item.label} query={context().inputValue} ignoreCase />
                {/snippet}
              </Combobox.Context>
            </Combobox.ItemText>
          </Combobox.Item>
        {/each}
      </Combobox.Content>
    </Combobox.Positioner>
  </Portal>
</Combobox.Root>
