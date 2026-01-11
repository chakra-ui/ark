import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useRef } from 'react'
import styles from 'styles/combobox.module.css'

export const Multiple = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const selectedValue = useRef<string[]>([])

  const { collection, filter, remove } = useListCollection({
    initialItems: [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'Python', value: 'python' },
      { label: 'Go', value: 'go' },
      { label: 'Rust', value: 'rust' },
      { label: 'Java', value: 'java' },
    ],
    filter: contains,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    selectedValue.current = details.value
    remove(...details.value)
  }

  return (
    <Combobox.Root
      className={styles.Root}
      collection={collection}
      onInputValueChange={handleInputChange}
      onValueChange={handleValueChange}
      multiple
    >
      <Combobox.Label className={styles.Label}>Skills</Combobox.Label>
      <Combobox.Context>
        {(combobox) => (
          <div className={styles.Tags}>
            {combobox.selectedItems.length === 0 && <span className={styles.TagPlaceholder}>None selected</span>}
            {combobox.selectedItems.map((item: any) => (
              <span key={item.value} className={styles.Tag}>
                {item.label}
              </span>
            ))}
          </div>
        )}
      </Combobox.Context>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. JavaScript" />
        <div className={styles.Indicators}>
          <Combobox.Trigger className={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={styles.Content}>
            <Combobox.Empty className={styles.Item}>No skills found</Combobox.Empty>
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
