import { Select, createListCollection } from '@ark-ui/solid/select'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { ChevronsUpDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
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
      class={styles.Root}
      collection={collection}
      scrollToIndexFn={(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })}
    >
      <Select.Label class={styles.Label}>Item</Select.Label>
      <Select.Control class={styles.Control}>
        <Select.Trigger class={styles.Trigger}>
          <Select.ValueText class={styles.ValueText} placeholder="Select an item" />
        </Select.Trigger>
        <div class={styles.Indicators}>
          <Select.Indicator class={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </div>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content class={styles.Content}>
            <Select.List
              class={styles.Scroller}
              style={{ '--total-size': `${virtualizer.getTotalSize()}px` }}
              render={(props) => <ListVirtualizer.Root {...props} value={virtualizer} />}
            >
              <ListVirtualizer.Content>
                <For each={virtualizer.getVirtualItems()}>
                  {(virtualItem) => {
                    const item = () => collection.items[virtualItem.index]
                    return (
                      <Select.Item
                        item={item()}
                        class={styles.Item}
                        render={(props) => <ListVirtualizer.Item {...props} item={virtualItem} />}
                      >
                        <Select.ItemText class={styles.ItemText}>{item().label}</Select.ItemText>
                        <Select.ItemIndicator class={styles.ItemIndicator}>✓</Select.ItemIndicator>
                      </Select.Item>
                    )
                  }}
                </For>
              </ListVirtualizer.Content>
            </Select.List>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
