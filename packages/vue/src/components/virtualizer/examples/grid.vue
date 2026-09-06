<script setup lang="ts">
import { GridVirtualizer, useGridVirtualizer } from '@ark-ui/vue/virtualizer'
import styles from 'styles/virtualizer.module.css'

const virtualizer = useGridVirtualizer({
  rowCount: 1000,
  columnCount: 50,
  estimatedRowSize: () => 40,
  estimatedColumnSize: () => 120,
})
</script>

<template>
  <GridVirtualizer.Root :value="virtualizer" :class="styles.Grid">
    <GridVirtualizer.Content>
      <GridVirtualizer.Row v-for="row in virtualizer.getVirtualRows()" :key="row.row" :row="row">
        <GridVirtualizer.Cell v-for="column in row.columns" :key="column.column" :column="column" :class="styles.Cell">
          R{{ row.row + 1 }}C{{ column.column + 1 }}
        </GridVirtualizer.Cell>
      </GridVirtualizer.Row>
    </GridVirtualizer.Content>
  </GridVirtualizer.Root>
</template>
