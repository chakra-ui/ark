import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export const ScrollToIndex = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })

  return (
    <div>
      <div className={styles.Controls}>
        <button type="button" className={styles.Trigger} onClick={() => virtualizer.scrollToIndex(0)}>
          Scroll to top
        </button>
        <button
          type="button"
          className={styles.Trigger}
          onClick={() => virtualizer.scrollToIndex(Math.floor(items.length / 2), { align: 'center' })}
        >
          Scroll to middle
        </button>
        <button type="button" className={styles.Trigger} onClick={() => virtualizer.scrollToIndex(items.length - 1)}>
          Scroll to bottom
        </button>
      </div>
      <ListVirtualizer.Root value={virtualizer} className={styles.Root}>
        <ListVirtualizer.Content>
          {virtualizer.getVirtualItems().map((item) => (
            <ListVirtualizer.Item
              key={item.key}
              item={item}
              className={`${styles.Item} ${item.index % 2 ? styles.ItemAlt : ''}`}
            >
              {items[item.index]}
            </ListVirtualizer.Item>
          ))}
        </ListVirtualizer.Content>
      </ListVirtualizer.Root>
    </div>
  )
}
