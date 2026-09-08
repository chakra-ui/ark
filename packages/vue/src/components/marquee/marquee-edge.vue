<script lang="ts">
import type { EdgeProps } from '@zag-js/marquee'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MarqueeEdgeBaseProps extends EdgeProps, PolymorphicProps {}
export interface MarqueeEdgeProps
  extends
    MarqueeEdgeBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useMarqueeContext } from './use-marquee-context.ts'

const props = defineProps<MarqueeEdgeProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getEdgeProps({ side: props.side })" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
