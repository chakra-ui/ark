import { WindowVirtualizer, useWindowVirtualizer } from '@ark-ui/react/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export const Window = () => {
  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })

  return (
    <WindowVirtualizer.Root value={virtualizer} className={styles.Window}>
      <WindowVirtualizer.Content>
        {virtualizer.getVirtualItems().map((item) => (
          <WindowVirtualizer.Item
            key={item.key}
            item={item}
            className={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}
          >
            {items[item.index]}
          </WindowVirtualizer.Item>
        ))}
      </WindowVirtualizer.Content>
    </WindowVirtualizer.Root>
  )
}
