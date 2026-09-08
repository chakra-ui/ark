<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseListVirtualizerReturn } from './use-list-virtualizer.ts'

export interface ListVirtualizerRootBaseProps extends PolymorphicProps {
  /**
   * The virtualizer instance returned by `useListVirtualizer`.
   */
  value: UseListVirtualizerReturn
}
export interface ListVirtualizerRootProps
  extends
    ListVirtualizerRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { type ComponentPublicInstance, computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { ListVirtualizerProvider } from './use-list-virtualizer-context.ts'

const props = defineProps<ListVirtualizerRootProps>()
const virtualizer = computed(() => props.value)

ListVirtualizerProvider(virtualizer)

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
