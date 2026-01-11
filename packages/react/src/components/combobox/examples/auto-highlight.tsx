import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'

export const AutoHighlight = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' },
      { label: 'Finance', value: 'finance' },
      { label: 'Human Resources', value: 'hr' },
      { label: 'Operations', value: 'operations' },
      { label: 'Product', value: 'product' },
      { label: 'Customer Success', value: 'customer-success' },
      { label: 'Legal', value: 'legal' },
      { label: 'Information Technology', value: 'information-technology' },
      { label: 'Design', value: 'design' },
    ],
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
      inputBehavior="autohighlight"
    >
      <Combobox.Label className={styles.Label}>Department</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Engineering" />
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
            <Combobox.Empty className={styles.Item}>No results found</Combobox.Empty>
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
