import { GridVirtualizer, useGridVirtualizer } from '@ark-ui/solid/virtualizer'
import { Index } from 'solid-js'
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
        <Index each={virtualizer.getVirtualRows()}>
          {(row) => (
            <GridVirtualizer.Row row={row()}>
              <Index each={row().columns}>
                {(column) => (
                  <GridVirtualizer.Cell column={column()} class={styles.Cell}>
                    R{row().row + 1}C{column().column + 1}
                  </GridVirtualizer.Cell>
                )}
              </Index>
            </GridVirtualizer.Row>
          )}
        </Index>
      </GridVirtualizer.Content>
    </GridVirtualizer.Root>
  )
}
