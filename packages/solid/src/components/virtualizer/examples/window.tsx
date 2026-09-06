import { WindowVirtualizer, useWindowVirtualizer } from '@ark-ui/solid/virtualizer'
import { For } from 'solid-js'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export const Window = () => {
  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })

  return (
    <WindowVirtualizer.Root value={virtualizer} class={styles.Window}>
      <WindowVirtualizer.Content>
        <For each={virtualizer.getVirtualItems()}>
          {(item) => (
            <WindowVirtualizer.Item item={item} class={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}>
              {items[item.index]}
            </WindowVirtualizer.Item>
          )}
        </For>
      </WindowVirtualizer.Content>
    </WindowVirtualizer.Root>
  )
}
