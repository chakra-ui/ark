<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MarqueeContentBaseProps extends PolymorphicProps {}
export interface MarqueeContentProps
  extends MarqueeContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useMarqueeContext } from './use-marquee-context'

defineProps<MarqueeContentProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <ark.div
    v-for="(_, index) in Array.from({ length: marquee.contentCount })"
    :key="index"
    v-bind="marquee.getContentProps({ index })"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
