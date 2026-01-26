<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ScrollAreaThumbBaseProps extends PolymorphicProps {}
export interface ScrollAreaThumbProps
  extends
    ScrollAreaThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'
import { useScrollAreaScrollbarPropsContext } from './use-scroll-area-scrollbar-props-context'

defineProps<ScrollAreaThumbBaseProps>()

const scrollArea = useScrollAreaContext()
const scrollbarProps = useScrollAreaScrollbarPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getThumbProps(scrollbarProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
