import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'

const suggestList = ['gmail.com', 'yahoo.com', 'ark-ui.com']

export const Dynamic = () => {
  const { collection, set } = useListCollection<string>({
    initialItems: [],
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    if (details.reason === 'input-change') {
      const items = suggestList.map((item) => `${details.inputValue}@${item}`)
      set(items)
    }
  }

  return (
    <Combobox.Root className={styles.Root} collection={collection} onInputValueChange={handleInputChange}>
      <Combobox.Label className={styles.Label}>Email</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. john" />
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
              <Combobox.Item className={styles.Item} key={item} item={item}>
                <Combobox.ItemText className={styles.ItemText}>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator className={styles.ItemIndicator}>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
