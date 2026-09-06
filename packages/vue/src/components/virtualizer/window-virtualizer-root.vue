<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseWindowVirtualizerReturn } from './use-window-virtualizer.ts'

export interface WindowVirtualizerRootBaseProps extends PolymorphicProps {
  /**
   * The virtualizer instance returned by `useWindowVirtualizer`.
   */
  value: UseWindowVirtualizerReturn
}
export interface WindowVirtualizerRootProps
  extends
    WindowVirtualizerRootBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { type ComponentPublicInstance, computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { WindowVirtualizerProvider } from './use-window-virtualizer-context.ts'

const props = defineProps<WindowVirtualizerRootProps>()
const virtualizer = computed(() => props.value)

WindowVirtualizerProvider(virtualizer)

const { forwardRef } = useForwardExpose()

const bindRoot = (element: Element | ComponentPublicInstance | null) => {
  forwardRef(element)
  virtualizer.value.ref(element)
}

const rootProps = computed(() => ({
  ...virtualizer.value.getContainerAriaAttrs(),
  style: virtualizer.value.getContainerStyle(),
}))
</script>

<template>
  <ark.div :ref="bindRoot" v-bind="rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
