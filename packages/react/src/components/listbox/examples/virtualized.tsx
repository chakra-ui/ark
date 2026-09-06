import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import { CheckIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import styles from 'styles/listbox.module.css'

const collection = createListCollection({
  items: Array.from({ length: 10000 }, (_, index) => ({ label: `Item ${index + 1}`, value: `item-${index + 1}` })),
})

export const Virtualized = () => {
  const virtualizer = useListVirtualizer({
    count: collection.size,
    estimatedSize: () => 32,
    overscan: 10,
  })

  return (
    <Listbox.Root
      className={styles.Root}
      collection={collection}
      scrollToIndexFn={(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })}
    >
      <Listbox.Label className={styles.Label}>Items</Listbox.Label>
      <Listbox.Content className={styles.Content}>
        <Listbox.List
          className={styles.Scroller}
          style={{ '--total-size': `${virtualizer.getTotalSize()}px` } as CSSProperties}
          render={<ListVirtualizer.Root value={virtualizer} />}
        >
          <ListVirtualizer.Content>
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const item = collection.items[virtualItem.index]
              return (
                <Listbox.Item
                  key={item.value}
                  item={item}
                  className={styles.Item}
                  render={<ListVirtualizer.Item item={virtualItem} />}
                >
                  <Listbox.ItemText className={styles.ItemText}>{item.label}</Listbox.ItemText>
                  <Listbox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Listbox.ItemIndicator>
                </Listbox.Item>
              )
            })}
          </ListVirtualizer.Content>
        </Listbox.List>
      </Listbox.Content>
    </Listbox.Root>
  )
}
