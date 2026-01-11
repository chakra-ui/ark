import { Select, createListCollection } from '@ark-ui/react/select'
import { CheckIcon, ChevronsUpDownIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/select.module.css'

const itemsBase = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const ReactiveCollection = () => {
  const [number, setNumber] = useState(0)
  const collection = createListCollection({
    items: itemsBase.map((item) => ({ ...item, label: `${item.label}-${number}` })),
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button className={button.Root} type="button" onClick={() => setNumber(number + 1)}>
          <PlusIcon />
        </button>
        <button className={button.Root} type="button" onClick={() => setNumber(number - 1)}>
          <MinusIcon />
        </button>
      </div>

      <Select.Root className={styles.Root} positioning={{ sameWidth: true }} collection={collection}>
        <Select.Label className={styles.Label}>Framework</Select.Label>
        <Select.Control className={styles.Control}>
          <Select.Trigger className={styles.Trigger}>
            <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
            <Select.Indicator className={styles.Indicator}>
              <ChevronsUpDownIcon />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            <Select.ItemGroup className={styles.ItemGroup}>
              <Select.ItemGroupLabel className={styles.ItemGroupLabel}>Framework</Select.ItemGroupLabel>
              {collection.items.map((item) => (
                <Select.Item className={styles.Item} item={item} key={item.label}>
                  <Select.ItemText className={styles.ItemText}>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </div>
  )
}
