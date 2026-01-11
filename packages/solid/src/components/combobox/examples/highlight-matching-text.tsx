import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { Highlight } from '@ark-ui/solid/highlight'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

export const HighlightMatchingText = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'John Smith', value: 'john-smith' },
      { label: 'Jane Doe', value: 'jane-doe' },
      { label: 'Bob Johnson', value: 'bob-johnson' },
      { label: 'Alice Williams', value: 'alice-williams' },
      { label: 'Charlie Brown', value: 'charlie-brown' },
      { label: 'Diana Ross', value: 'diana-ross' },
    ],
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root class={styles.Root} collection={collection()} onInputValueChange={handleInputChange}>
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
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item class={styles.Item} item={item}>
                  <Combobox.ItemText class={styles.ItemText}>
                    <Combobox.Context>
                      {(context) => <Highlight text={item.label} query={context().inputValue} ignoreCase />}
                    </Combobox.Context>
                  </Combobox.ItemText>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
