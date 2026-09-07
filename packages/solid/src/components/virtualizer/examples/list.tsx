import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { Index } from 'solid-js'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export const List = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })

  return (
    <ListVirtualizer.Root value={virtualizer} class={styles.Root}>
      <ListVirtualizer.Content>
        <Index each={virtualizer.getVirtualItems()}>
          {(item) => (
            <ListVirtualizer.Item item={item()} class={`${styles.Item} ${item().index % 2 ? styles.ItemAlt : ''}`}>
              {items[item().index]}
            </ListVirtualizer.Item>
          )}
        </Index>
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}
