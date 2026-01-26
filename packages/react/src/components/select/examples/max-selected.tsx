import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/select.module.css'

const items = ['React', 'Solid', 'Vue', 'Svelte']
const MAX_SELECTION = 2
const hasReachedMax = (value: string[]) => value.length >= MAX_SELECTION

export const MaxSelected = () => {
  const [value, setValue] = useState<string[]>([])

  const collection = createListCollection({
    items: items.map((item) => ({
      label: item,
      value: item,
      disabled: hasReachedMax(value) && !value.includes(item),
    })),
  })

  const handleValueChange = (details: Select.ValueChangeDetails) => {
    if (hasReachedMax(value) && details.value.length > value.length) return
    setValue(details.value)
  }

  return (
    <Select.Root
      className={styles.Root}
      collection={collection}
      multiple
      value={value}
      onValueChange={handleValueChange}
    >
      <Select.Label className={styles.Label}>Framework</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select" />
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger className={styles.ClearTrigger}>
          <XIcon />
        </Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            <Select.ItemGroup className={styles.ItemGroup}>
              <Select.ItemGroupLabel className={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
              {collection.items.map((item) => (
                <Select.Item className={styles.Item} key={item.value} item={item}>
                  <Select.ItemText className={styles.ItemText}>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
