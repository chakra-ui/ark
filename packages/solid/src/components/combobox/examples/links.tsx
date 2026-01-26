import { Combobox, useListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/combobox.module.css'

const initialItems = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stackoverflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
  { label: 'React', href: 'https://react.dev', value: 'react' },
]

export const Links = () => {
  const filterFn = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: filterFn().contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      class={styles.Root}
      collection={collection()}
      onInputValueChange={handleInputChange}
      selectionBehavior="preserve"
    >
      <Combobox.Label class={styles.Label}>Developer Resources</Combobox.Label>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. GitHub" />
        <div class={styles.Indicators}>
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
                <Combobox.Item class={styles.Item} item={item} asChild={(props) => <a href={item.href} {...props()} />}>
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
