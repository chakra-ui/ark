'use client'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import { css, cx } from 'styled-system/css'

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`)

const styles = {
  root: css({
    height: '64',
    width: 'full',
    maxW: 'sm',
    borderWidth: '1px',
    borderRadius: 'l2',
    background: 'bg.default',
  }),
  item: css({
    display: 'flex',
    alignItems: 'center',
    height: '10',
    px: '4',
    borderBottomWidth: '1px',
    color: 'fg.default',
    textStyle: 'sm',
    fontWeight: 'medium',
  }),
  itemAlt: css({
    background: 'bg.subtle',
  }),
}

export const Demo = () => {
  const virtualizer = useListVirtualizer({
    count: items.length,
    estimatedSize: () => 40,
  })

  return (
    <ListVirtualizer.Root value={virtualizer} className={styles.root}>
      <ListVirtualizer.Content>
        {virtualizer.getVirtualItems().map((item) => (
          <ListVirtualizer.Item
            key={item.key}
            item={item}
            className={cx(styles.item, item.index % 2 === 1 && styles.itemAlt)}
          >
            {items[item.index]}
          </ListVirtualizer.Item>
        ))}
      </ListVirtualizer.Content>
    </ListVirtualizer.Root>
  )
}
