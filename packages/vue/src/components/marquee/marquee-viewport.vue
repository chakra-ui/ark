<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MarqueeViewportBaseProps extends PolymorphicProps {}
export interface MarqueeViewportProps
  extends
    MarqueeViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useMarqueeContext } from './use-marquee-context'

defineProps<MarqueeViewportProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
