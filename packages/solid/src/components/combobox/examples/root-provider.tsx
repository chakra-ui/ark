import { Combobox, useCombobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/combobox.module.css'

const initialItems = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'pm' },
  { label: 'Data Scientist', value: 'data-scientist' },
  { label: 'DevOps Engineer', value: 'devops' },
  { label: 'Marketing Lead', value: 'marketing' },
]

export const RootProvider = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
  })

  const combobox = useCombobox({
    get collection() {
      return collection()
    },
    onInputValueChange(details) {
      filter(details.inputValue)
    },
  })

  return (
    <div class="stack">
      <button class={button.Root} onClick={() => combobox().focus()}>
        Focus
      </button>

      <Combobox.RootProvider class={styles.Root} value={combobox}>
        <Combobox.Label class={styles.Label}>Job Title</Combobox.Label>
        <Combobox.Control class={styles.Control}>
          <Combobox.Input class={styles.Input} placeholder="e.g. Designer" />
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
      </Combobox.RootProvider>
    </div>
  )
}
