import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import styles from 'styles/virtualizer.module.css'

const items = Array.from({ length: 10000 }, (_, index) => ({
  title: `Item ${index + 1}`,
  lines: Array.from({ length: (index % 4) + 1 }, (_, line) => `Line ${line + 1} of item ${index + 1}`),
}))

export const DynamicSize = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    estimatedSize: () => 64,
  })

  return (
    <ListVirtualizer.Root value={virtualizer} className={styles.Root}>
      <ListVirtualizer.Content>
        {virtualizer.getVirtualItems().map((item) => (
          <ListVirtualizer.Item
            key={item.key}
            item={item}
            measure
            className={`${styles.ItemDynamic} ${item.index % 2 ? styles.ItemAlt : ''}`}
          >
            <strong>{items[item.index].title}</strong>
            {items[item.index].lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </ListVirtualizer.Item>
        ))}
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}
