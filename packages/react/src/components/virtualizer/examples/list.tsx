import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

export const List = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    estimatedSize: () => 48,
  })

  return (
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
  )
}
