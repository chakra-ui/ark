import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

export const Basic = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
      { label: 'Mango', value: 'mango' },
      { label: 'Pineapple', value: 'pineapple' },
      { label: 'Strawberry', value: 'strawberry' },
    ],
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root class={styles.Root} collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Label class={styles.Label}>Favorite Fruit</Combobox.Label>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. Apple" />
        <div class={styles.Indicators}>
          <Combobox.ClearTrigger class={styles.ClearTrigger}>
            <XIcon />
          </Combobox.ClearTrigger>
          <Combobox.Trigger class={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
            <For each={collection().items}>
              {(item) => (
                <Combobox.Item class={styles.Item} item={item}>
                  <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator class={styles.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
