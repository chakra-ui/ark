<script lang="ts">
  import { GridVirtualizer, useGridVirtualizer } from '@ark-ui/svelte/virtualizer'
  import styles from 'styles/virtualizer.module.css'

  const virtualizer = useGridVirtualizer(() => ({
    rowCount: 1000,
    columnCount: 50,
    estimatedRowSize: () => 40,
    estimatedColumnSize: () => 120,
  }))
</script>

<GridVirtualizer.Root value={virtualizer} class={styles.Grid}>
  <GridVirtualizer.Content>
    {#each virtualizer.getVirtualRows() as row (row.row)}
      <GridVirtualizer.Row {row}>
        {#each row.columns as column (column.column)}
          <GridVirtualizer.Cell {column} class={styles.Cell}>
            R{row.row + 1}C{column.column + 1}
          </GridVirtualizer.Cell>
        {/each}
      </GridVirtualizer.Row>
    {/each}
  </GridVirtualizer.Content>
</GridVirtualizer.Root>
