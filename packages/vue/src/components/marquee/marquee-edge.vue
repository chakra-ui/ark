<script lang="ts">
import type { EdgeProps } from '@zag-js/marquee'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MarqueeEdgeBaseProps extends EdgeProps, PolymorphicProps {}
export interface MarqueeEdgeProps
  extends MarqueeEdgeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useMarqueeContext } from './use-marquee-context'

const props = defineProps<MarqueeEdgeProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getEdgeProps({ side: props.side })" :as-child="asChild">
    <slot />
  </ark.div>
</template>
