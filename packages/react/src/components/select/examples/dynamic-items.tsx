import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/select.module.css'

export const DynamicItems = () => {
  const [items, setItems] = useState(['React', 'Solid', 'Vue', 'Svelte'])
  const collection = createListCollection({
    items: items,
  })

  const addItem = () => setItems([...items, 'Angular'])

  return (
    <div>
      <Select.Root className={styles.Root} collection={collection}>
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
                  <Select.Item className={styles.Item} key={item} item={item}>
                    <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                    <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>

      <button className={button.Root} style={{ marginTop: '1rem' }} type="button" onClick={addItem}>
        Add Item
      </button>
    </div>
  )
}
