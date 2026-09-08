import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { Index } from 'solid-js'
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
    <ListVirtualizer.Root value={virtualizer} class={styles.Root}>
      <ListVirtualizer.Content>
        <Index each={virtualizer.getVirtualItems()}>
          {(item) => (
            <ListVirtualizer.Item
              item={item()}
              measure
              class={`${styles.ItemDynamic} ${item().index % 2 ? styles.ItemAlt : ''}`}
            >
              <strong>{items[item().index].title}</strong>
              <Index each={items[item().index].lines}>{(line) => <p>{line()}</p>}</Index>
            </ListVirtualizer.Item>
          )}
        </Index>
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}
