<script lang="ts">
import type { Orientation } from '@zag-js/types'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps {}
export interface ScrollAreaScrollbarProps
  extends
    ScrollAreaScrollbarBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'
import { ScrollAreaScrollbarPropsProvider } from './use-scroll-area-scrollbar-props-context'

const props = defineProps<ScrollAreaScrollbarBaseProps>()
const scrollArea = useScrollAreaContext()

ScrollAreaScrollbarPropsProvider(computed(() => props))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getScrollbarProps({ orientation: props.orientation })" :as-child="asChild">
    <slot />
  </ark.div>
</template>
