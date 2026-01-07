import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon } from 'lucide-react'
import styles from 'styles/select.module.css'

export const Overflow = () => {
  const collection = createListCollection({
    items: [
      'Name 1',
      'Name 2',
      'Name 3',
      'Name 4',
      'Name 5',
      'Name 6',
      'Name 7',
      'Name 8',
      'Name 9',
      'Name 10',
      'Name 11',
      'Name 12',
      'Name 13',
      'Name 14',
    ],
  })

  return (
    <Select.Root
      className={styles.Root}
      collection={collection}
      positioning={{
        fitViewport: true,
        placement: 'bottom-start',
        sameWidth: true,
      }}
    >
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
          <Select.Content className={styles.Content} style={{ maxHeight: '200px' }}>
            <Select.ItemGroup className={styles.ItemGroup}>
              <Select.ItemGroupLabel className={styles.ItemGroupLabel}>Names</Select.ItemGroupLabel>
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
  )
}
