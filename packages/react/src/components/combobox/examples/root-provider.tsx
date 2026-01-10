import { Combobox, useCombobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
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
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
  })

  const combobox = useCombobox({
    collection,
    onInputValueChange(details) {
      filter(details.inputValue)
    },
  })

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => combobox.focus()}>
        Focus
      </button>

      <Combobox.RootProvider className={styles.Root} value={combobox}>
        <Combobox.Label className={styles.Label}>Job Title</Combobox.Label>
        <Combobox.Control className={styles.Control}>
          <Combobox.Input className={styles.Input} placeholder="e.g. Designer" />
          <div className={styles.Indicators}>
            <Combobox.ClearTrigger className={styles.ClearTrigger}>
              <XIcon />
            </Combobox.ClearTrigger>
            <Combobox.Trigger className={styles.Trigger}>
              <ChevronsUpDownIcon />
            </Combobox.Trigger>
          </div>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content className={styles.Content}>
              {collection.items.map((item) => (
                <Combobox.Item className={styles.Item} key={item.value} item={item}>
                  <Combobox.ItemText className={styles.ItemText}>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.RootProvider>
    </div>
  )
}
