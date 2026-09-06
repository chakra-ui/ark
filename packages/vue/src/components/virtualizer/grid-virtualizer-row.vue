<script lang="ts">
import type { VirtualRow } from '@zag-js/virtualizer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface GridVirtualizerRowBaseProps extends PolymorphicProps {
  /**
   * The virtual row to render.
   */
  row: VirtualRow
  /**
   * Whether to measure the rendered height of the row and use it instead of the estimate.
   * @default false
   */
  measure?: boolean
}
export interface GridVirtualizerRowProps
  extends
    GridVirtualizerRowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { type ComponentPublicInstance, computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'
import { GridVirtualizerRowProvider } from './use-grid-virtualizer-row-context.ts'

const props = defineProps<GridVirtualizerRowProps>()
const virtualizer = useGridVirtualizerContext()

GridVirtualizerRowProvider(computed(() => props.row))

const { forwardRef } = useForwardExpose()

let measuredElement: HTMLElement | null = null

const bindRow = (element: Element | ComponentPublicInstance | null) => {
  forwardRef(element)
  if (!props.measure) return
  const node = element && '$el' in element ? element.$el : element
  const next = node instanceof HTMLElement ? node : null
  if (next === measuredElement) return
  measuredElement = next
  props.row.measureRow(next)
}

const rowProps = computed(() => ({
  ...virtualizer.value.getRowAriaAttrs(props.row.row),
  style: virtualizer.value.getRowStyle(props.row),
}))
</script>

<template>
  <ark.div :ref="bindRow" v-bind="rowProps" :data-index="row.row" :as-child="asChild">
    <slot />
  </ark.div>
</template>
