import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { For } from 'solid-js'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `${index + 1}`)

export const Horizontal = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    orientation: 'horizontal',
    estimatedSize: () => 80,
  })

  return (
    <ListVirtualizer.Root value={virtualizer} class={styles.RootHorizontal}>
      <ListVirtualizer.Content>
        <For each={virtualizer.getVirtualItems()}>
          {(item) => (
            <ListVirtualizer.Item
              item={item}
              class={`${styles.ItemHorizontal} ${item.index % 2 ? styles.ItemAlt : ''}`}
            >
              {items[item.index]}
            </ListVirtualizer.Item>
          )}
        </For>
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}
