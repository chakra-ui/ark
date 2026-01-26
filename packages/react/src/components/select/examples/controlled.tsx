import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/select.module.css'

interface Item {
  label: string
  value: string
  disabled?: boolean | undefined
}

export const Controlled = () => {
  const [value, setValue] = useState<string[]>([])

  const collection = createListCollection<Item>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte', disabled: true },
    ],
  })

  const handleValueChange = (details: Select.ValueChangeDetails<Item>) => {
    setValue(details.value)
  }

  return (
    <Select.Root className={styles.Root} collection={collection} value={value} onValueChange={handleValueChange}>
      <Select.Label className={styles.Label}>Framework</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
        </Select.Trigger>
        <div className={styles.Indicators}>
          <Select.ClearTrigger className={styles.ClearTrigger}>
            <XIcon />
          </Select.ClearTrigger>
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </div>
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
