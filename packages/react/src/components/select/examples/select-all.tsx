import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon } from 'lucide-react'
import styles from 'styles/select.module.css'
import button from 'styles/button.module.css'

const SelectAllButton = () => {
  return (
    <Select.Context>
      {(api) => (
        <button
          className={button.Root}
          style={{ width: '100%', marginBottom: '0.25rem' }}
          type="button"
          onClick={() => {
            api.selectAll()
            api.setOpen(false)
          }}
        >
          Select All
        </button>
      )}
    </Select.Context>
  )
}

export const SelectAll = () => {
  const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

  return (
    <Select.Root className={styles.Root} collection={collection}>
      <Select.Label className={styles.Label}>Framework</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger className={styles.ClearTrigger}>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            <SelectAllButton />
            {collection.items.map((item) => (
              <Select.Item className={styles.Item} key={item} item={item}>
                <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
