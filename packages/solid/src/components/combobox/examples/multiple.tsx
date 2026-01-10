import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

export const Multiple = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  let selectedValue: string[] = []

  const { collection, filter, remove } = useListCollection({
    initialItems: [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Python', value: 'python' },
      { label: 'Go', value: 'go' },
      { label: 'Rust', value: 'rust' },
      { label: 'Java', value: 'java' },
    ],
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    selectedValue = details.value
    remove(...details.value)
  }

  return (
    <Combobox.Root
      class={styles.Root}
      collection={collection()}
      onInputValueChange={handleInputChange}
      onValueChange={handleValueChange}
      multiple
    >
      <Combobox.Label class={styles.Label}>Skills</Combobox.Label>
      <Combobox.Context>
        {(context) => (
          <div class={styles.Tags}>
            {context().selectedItems.length === 0 && <span class={styles.TagPlaceholder}>None selected</span>}
            <For each={context().selectedItems}>{(item: any) => <span class={styles.Tag}>{item.label}</span>}</For>
          </div>
        )}
      </Combobox.Context>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. JavaScript" />
        <div class={styles.Indicators}>
          <Combobox.Trigger class={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
            <Combobox.Empty class={styles.Item}>No skills found</Combobox.Empty>
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
