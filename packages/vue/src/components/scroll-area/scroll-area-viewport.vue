<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ScrollAreaViewportBaseProps extends PolymorphicProps {}
export interface ScrollAreaViewportProps
  extends ScrollAreaViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

defineProps<ScrollAreaViewportProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
