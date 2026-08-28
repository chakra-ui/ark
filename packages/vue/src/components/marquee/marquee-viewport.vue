<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useMarqueeContext } from './use-marquee-context.ts'

defineProps<MarqueeViewportProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getViewportProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
