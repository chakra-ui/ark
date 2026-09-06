import { GridVirtualizer, useGridVirtualizer } from '@ark-ui/solid/virtualizer'
import { For } from 'solid-js'
import styles from 'styles/virtualizer.module.css'

export const Grid = () => {
  const virtualizer = useGridVirtualizer({
    rowCount: 1000,
    columnCount: 50,
    estimatedRowSize: () => 40,
    estimatedColumnSize: () => 120,
  })

  return (
    <GridVirtualizer.Root value={virtualizer} class={styles.Grid}>
      <GridVirtualizer.Content>
        <For each={virtualizer.getVirtualRows()}>
          {(row) => (
            <GridVirtualizer.Row row={row}>
              <For each={row.columns}>
                {(column) => (
                  <GridVirtualizer.Cell column={column} class={styles.Cell}>
                    R{row.row + 1}C{column.column + 1}
                  </GridVirtualizer.Cell>
                )}
              </For>
            </GridVirtualizer.Row>
          )}
        </For>
      </GridVirtualizer.Content>
    </GridVirtualizer.Root>
  )
}
