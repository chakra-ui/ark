import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
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
      class={styles.Root}
      collection={collection}
      scrollToIndexFn={(details) => virtualizer.scrollToIndex(details.index, { align: 'auto' })}
    >
      <Listbox.Label class={styles.Label}>Items</Listbox.Label>
      <Listbox.Content class={styles.Content}>
        <Listbox.List
          class={styles.Scroller}
          style={{ '--total-size': `${virtualizer.getTotalSize()}px` }}
          render={(props) => <ListVirtualizer.Root {...props()} value={virtualizer} />}
        >
          <ListVirtualizer.Content>
            <Index each={virtualizer.getVirtualItems()}>
              {(virtualItem) => {
                const item = () => collection.items[virtualItem().index]
                return (
                  <Listbox.Item
                    item={item()}
                    class={styles.Item}
                    render={(props) => <ListVirtualizer.Item {...props()} item={virtualItem()} />}
                  >
                    <Listbox.ItemText class={styles.ItemText}>{item().label}</Listbox.ItemText>
                    <Listbox.ItemIndicator class={styles.ItemIndicator}>
                      <CheckIcon />
                    </Listbox.ItemIndicator>
                  </Listbox.Item>
                )
              }}
            </Index>
          </ListVirtualizer.Content>
        </Listbox.List>
      </Listbox.Content>
    </Listbox.Root>
  )
}
