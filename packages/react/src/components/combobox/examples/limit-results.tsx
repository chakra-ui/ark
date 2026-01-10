import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
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
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: cities,
    limit: 5,
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root className={styles.Root} collection={collection} onInputValueChange={handleInputChange}>
      <Combobox.Label className={styles.Label}>City</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. New York" />
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
    </Combobox.Root>
  )
}
