import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import { ChevronsUpDownIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import styles from 'styles/select.module.css'

const collection = createListCollection({
  items: Array.from({ length: 5000 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })),
})

export const Virtualized = () => {
  const virtualizer = useListVirtualizer({
    count: collection.size,
    estimatedSize: () => 36,
    overscan: 10,
    observeScrollElementSize: true,
  })

  return (
    <Select.Root
      className={styles.Root}
      collection={collection}
      scrollToIndexFn={(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })}
    >
      <Select.Label className={styles.Label}>Item</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select an item" />
        </Select.Trigger>
        <div className={styles.Indicators}>
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </div>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            <Select.List
              className={styles.Scroller}
              style={{ '--total-size': `${virtualizer.getTotalSize()}px` } as CSSProperties}
              render={<ListVirtualizer.Root value={virtualizer} />}
            >
              <ListVirtualizer.Content>
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const item = collection.items[virtualItem.index]
                  return (
                    <Select.Item
                      key={item.value}
                      item={item}
                      className={styles.Item}
                      render={<ListVirtualizer.Item item={virtualItem} />}
                    >
                      <Select.ItemText className={styles.ItemText}>{item.label}</Select.ItemText>
                      <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                    </Select.Item>
                  )
                })}
              </ListVirtualizer.Content>
            </Select.List>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
