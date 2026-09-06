import { GridVirtualizer, useGridVirtualizer } from '@ark-ui/react/virtualizer'
import styles from 'styles/virtualizer.module.css'

export const Grid = () => {
  const virtualizer = useGridVirtualizer({
    rowCount: 1000,
    columnCount: 50,
    estimatedRowSize: () => 40,
    estimatedColumnSize: () => 120,
  })

  return (
    <GridVirtualizer.Root value={virtualizer} className={styles.Grid}>
      <GridVirtualizer.Content>
        {virtualizer.getVirtualRows().map((row) => (
          <GridVirtualizer.Row key={row.row} row={row}>
            {row.columns.map((column) => (
              <GridVirtualizer.Cell key={column.column} column={column} className={styles.Cell}>
                R{row.row + 1}C{column.column + 1}
              </GridVirtualizer.Cell>
            ))}
          </GridVirtualizer.Row>
        ))}
      </GridVirtualizer.Content>
    </GridVirtualizer.Root>
  )
}
