<script lang="ts">
import type { CornerState } from '@zag-js/scroll-area'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ScrollAreaCornerState extends CornerState {}
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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useScrollAreaContext } from './use-scroll-area-context.ts'

defineProps<ScrollAreaCornerProps>()

defineSlots<PolymorphicSlots<ScrollAreaCornerState>>()
const scrollArea = useScrollAreaContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="scrollArea.getCornerProps()" :state="scrollArea.getCornerState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
