<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ScrollAreaContentBaseProps extends PolymorphicProps {}
export interface ScrollAreaContentProps
  extends
    ScrollAreaContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

defineProps<ScrollAreaContentProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
