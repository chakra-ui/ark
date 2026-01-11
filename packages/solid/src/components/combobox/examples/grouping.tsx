import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

const initialItems = [
  { label: 'Canada', value: 'ca', continent: 'North America' },
  { label: 'United States', value: 'us', continent: 'North America' },
  { label: 'Mexico', value: 'mx', continent: 'North America' },
  { label: 'United Kingdom', value: 'uk', continent: 'Europe' },
  { label: 'Germany', value: 'de', continent: 'Europe' },
  { label: 'France', value: 'fr', continent: 'Europe' },
  { label: 'Japan', value: 'jp', continent: 'Asia' },
  { label: 'South Korea', value: 'kr', continent: 'Asia' },
  { label: 'China', value: 'cn', continent: 'Asia' },
]

export const Grouping = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
    groupBy: (item) => item.continent,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root class={styles.Root} collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Label class={styles.Label}>Country</Combobox.Label>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. Canada" />
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
            <For each={collection().group()}>
              {([continent, group]) => (
                <Combobox.ItemGroup class={styles.ItemGroup}>
                  <Combobox.ItemGroupLabel class={styles.ItemGroupLabel}>{continent}</Combobox.ItemGroupLabel>
                  <For each={group}>
                    {(item) => (
                      <Combobox.Item class={styles.Item} item={item}>
                        <Combobox.ItemText class={styles.ItemText}>{item.label}</Combobox.ItemText>
                        <Combobox.ItemIndicator class={styles.ItemIndicator}>
                          <CheckIcon />
                        </Combobox.ItemIndicator>
                      </Combobox.Item>
                    )}
                  </For>
                </Combobox.ItemGroup>
              )}
            </For>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
