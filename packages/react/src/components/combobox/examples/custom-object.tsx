import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'

export const CustomObject = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { country: 'United States', code: 'US', flag: '🇺🇸' },
      { country: 'Canada', code: 'CA', flag: '🇨🇦' },
      { country: 'Australia', code: 'AU', flag: '🇦🇺' },
    ],
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root className={styles.Root} collection={collection} onInputValueChange={handleInputChange}>
      <Combobox.Label className={styles.Label}>Country</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Canada" />
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
            <Combobox.List className={styles.List}>
              {collection.items.map((item) => (
                <Combobox.Item className={styles.Item} key={item.code} item={item}>
                  <Combobox.ItemText className={styles.ItemText}>
                    {item.flag} {item.country}
                  </Combobox.ItemText>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
