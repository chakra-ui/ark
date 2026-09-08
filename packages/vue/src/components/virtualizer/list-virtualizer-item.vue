<script lang="ts">
import type { VirtualItem } from '@zag-js/virtualizer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ListVirtualizerItemBaseProps extends PolymorphicProps {
  /**
   * The virtual item to render.
   */
  item: VirtualItem
  /**
   * Whether to measure the rendered size of the item and use it instead of the estimate.
   * @default false
   */
  measure?: boolean
}
export interface ListVirtualizerItemProps
  extends
    ListVirtualizerItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { type ComponentPublicInstance, computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

const props = defineProps<ListVirtualizerItemProps>()
const virtualizer = useListVirtualizerContext()

const { forwardRef } = useForwardExpose()

let measuredElement: HTMLElement | null = null

const bindItem = (element: Element | ComponentPublicInstance | null) => {
  forwardRef(element)
  if (!props.measure) return
  const node = element && '$el' in element ? element.$el : element
  const next = node instanceof HTMLElement ? node : null
  if (next === measuredElement) return
  measuredElement = next
  props.item.measureElement(next)
}

const itemProps = computed(() => ({
  ...virtualizer.value.getItemAriaAttrs(props.item.index),
  style: virtualizer.value.getItemStyle(props.item),
}))
</script>

<template>
  <ark.div :ref="bindItem" v-bind="itemProps" :data-index="item.index" :as-child="asChild">
    <slot />
  </ark.div>
</template>
