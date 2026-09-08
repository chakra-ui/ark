<script lang="ts">
import type { ScrollbarState } from '@zag-js/scroll-area'
import type { Orientation } from '@zag-js/types'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

interface ScrollbarProps {
  orientation?: Orientation
}

export interface ScrollAreaScrollbarState extends ScrollbarState {}
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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useScrollAreaContext } from './use-scroll-area-context.ts'
import { ScrollAreaScrollbarPropsProvider } from './use-scroll-area-scrollbar-props-context.ts'

const props = defineProps<ScrollAreaScrollbarBaseProps>()

defineSlots<PolymorphicSlots<ScrollAreaScrollbarState>>()
const scrollArea = useScrollAreaContext()

ScrollAreaScrollbarPropsProvider(computed(() => props))

useForwardExpose()
</script>

<template>
  <ark.div
    v-bind="scrollArea.getScrollbarProps({ orientation: props.orientation })"
    :state="scrollArea.getScrollbarState({ orientation: props.orientation })"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
