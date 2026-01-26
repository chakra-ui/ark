import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'

export const Links = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      className={styles.Root}
      collection={collection}
      onInputValueChange={handleInputChange}
      selectionBehavior="preserve"
    >
      <Combobox.Label className={styles.Label}>Developer Resources</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. GitHub" />
        <div className={styles.Indicators}>
          <Combobox.Trigger className={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={styles.Content}>
            {collection.items.map((item) => (
              <Combobox.Item className={styles.Item} key={item.value} item={item} asChild>
                <a href={item.href}>
                  <Combobox.ItemText className={styles.ItemText}>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </a>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const initialItems = [
  { label: 'GitHub', href: 'https://github.com', value: 'github' },
  { label: 'Stack Overflow', href: 'https://stackoverflow.com', value: 'stackoverflow' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org', value: 'mdn' },
  { label: 'npm', href: 'https://www.npmjs.com', value: 'npm' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org', value: 'typescript' },
  { label: 'React', href: 'https://react.dev', value: 'react' },
]
