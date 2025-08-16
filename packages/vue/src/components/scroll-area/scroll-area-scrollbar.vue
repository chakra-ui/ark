<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Orientation } from '@zag-js/types'
import type { PolymorphicProps } from '../factory'

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps {}
export interface ScrollAreaScrollbarProps
  extends ScrollAreaScrollbarBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

const props = defineProps<ScrollAreaScrollbarBaseProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getScrollbarProps({ orientation: props.orientation })" :as-child="asChild">
    <slot />
  </ark.div>
</template>
