<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ScrollAreaCornerBaseProps extends PolymorphicProps {}
export interface ScrollAreaCornerProps
  extends
    ScrollAreaCornerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useScrollAreaContext } from './use-scroll-area-context'

defineProps<ScrollAreaCornerProps>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getCornerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
