<script lang="ts">
import type { VirtualColumn } from '@zag-js/virtualizer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface GridVirtualizerCellBaseProps extends PolymorphicProps {
  /**
   * The virtual column to render within the current row.
   */
  column: VirtualColumn
}
export interface GridVirtualizerCellProps
  extends
    GridVirtualizerCellBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
import { useGridVirtualizerRowContext } from './use-grid-virtualizer-row-context.ts'

const props = defineProps<GridVirtualizerCellProps>()
const virtualizer = useGridVirtualizerContext()
const row = useGridVirtualizerRowContext()

useForwardExpose()

const cellProps = computed(() => ({
  ...virtualizer.value.getCellAriaAttrs(row.value.row, props.column.column),
  style: virtualizer.value.getCellStyleInRow(props.column),
}))
</script>

<template>
  <ark.div v-bind="cellProps" :data-index="column.column" :as-child="asChild">
    <slot />
  </ark.div>
</template>
