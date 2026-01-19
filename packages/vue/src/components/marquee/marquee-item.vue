<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MarqueeItemBaseProps extends PolymorphicProps {}
export interface MarqueeItemProps
  extends
    MarqueeItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useMarqueeContext } from './use-marquee-context'

defineProps<MarqueeItemProps>()
const marquee = useMarqueeContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getItemProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
