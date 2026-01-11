import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

const cities = [
  { label: 'New York', value: 'new-york' },
  { label: 'Los Angeles', value: 'los-angeles' },
  { label: 'Chicago', value: 'chicago' },
  { label: 'Houston', value: 'houston' },
  { label: 'Phoenix', value: 'phoenix' },
  { label: 'Philadelphia', value: 'philadelphia' },
  { label: 'San Antonio', value: 'san-antonio' },
  { label: 'San Diego', value: 'san-diego' },
  { label: 'Dallas', value: 'dallas' },
  { label: 'San Jose', value: 'san-jose' },
  { label: 'Austin', value: 'austin' },
  { label: 'Jacksonville', value: 'jacksonville' },
  { label: 'Fort Worth', value: 'fort-worth' },
  { label: 'Columbus', value: 'columbus' },
  { label: 'Charlotte', value: 'charlotte' },
  { label: 'San Francisco', value: 'san-francisco' },
  { label: 'Indianapolis', value: 'indianapolis' },
  { label: 'Seattle', value: 'seattle' },
  { label: 'Denver', value: 'denver' },
  { label: 'Boston', value: 'boston' },
]

export const LimitResults = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: cities,
    limit: 5,
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root class={styles.Root} collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Label class={styles.Label}>City</Combobox.Label>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. New York" />
        <div class={styles.Indicators}>
          <Combobox.Trigger class={styles.Trigger}>Open</Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
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
