import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

export const InlineAutocomplete = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Whale', value: 'whale' },
      { label: 'Dolphin', value: 'dolphin' },
      { label: 'Shark', value: 'shark' },
      { label: 'Octopus', value: 'octopus' },
      { label: 'Jellyfish', value: 'jellyfish' },
      { label: 'Seahorse', value: 'seahorse' },
    ],
    filter: filterFn().startsWith,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      class={styles.Root}
      collection={collection()}
      onInputValueChange={handleInputChange}
      inputBehavior="autocomplete"
    >
      <Combobox.Label class={styles.Label}>Sea Creature</Combobox.Label>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. Dolphin" />
        <div class={styles.Indicators}>
          <Combobox.ClearTrigger class={styles.ClearTrigger}>Clear</Combobox.ClearTrigger>
          <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
            <Combobox.Empty class={styles.Item}>No results found</Combobox.Empty>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item class={styles.Item} item={item}>
                  <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator class={styles.ItemIndicator}>✓</Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
