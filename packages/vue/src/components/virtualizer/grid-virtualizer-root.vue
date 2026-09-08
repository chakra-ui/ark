<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseGridVirtualizerReturn } from './use-grid-virtualizer.ts'

export interface GridVirtualizerRootBaseProps extends PolymorphicProps {
  /**
   * The virtualizer instance returned by `useGridVirtualizer`.
   */
  value: UseGridVirtualizerReturn
}
export interface GridVirtualizerRootProps
  extends
    GridVirtualizerRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { type ComponentPublicInstance, computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { GridVirtualizerProvider } from './use-grid-virtualizer-context.ts'

const props = defineProps<GridVirtualizerRootProps>()
const virtualizer = computed(() => props.value)

GridVirtualizerProvider(virtualizer)

const { forwardRef } = useForwardExpose()

const bindRoot = (element: Element | ComponentPublicInstance | null) => {
  forwardRef(element)
  virtualizer.value.ref(element)
}

const rootProps = computed(() => ({
  ...virtualizer.value.getContainerAriaAttrs(),
  style: virtualizer.value.getContainerStyle(),
}))

const handleScroll = (event: Event) => virtualizer.value.getScrollHandler()(event)
</script>

<template>
  <ark.div :ref="bindRoot" v-bind="rootProps" :as-child="asChild" @scroll="handleScroll">
    <slot />
  </ark.div>
</template>
