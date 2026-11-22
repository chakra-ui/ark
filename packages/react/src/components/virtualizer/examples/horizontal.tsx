import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => `${index + 1}`)

export const Horizontal = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    orientation: 'horizontal',
    estimatedSize: () => 80,
  })

  return (
    <ListVirtualizer.Root value={virtualizer} className={styles.RootHorizontal}>
      <ListVirtualizer.Content>
        {virtualizer.getVirtualItems().map((item) => (
          <ListVirtualizer.Item
            key={item.key}
            item={item}
            className={`${styles.ItemHorizontal} ${item.index % 2 ? styles.ItemAlt : ''}`}
          >
            {items[item.index]}
          </ListVirtualizer.Item>
        ))}
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}
