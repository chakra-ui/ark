<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseMarqueeReturn } from './use-marquee'

interface RootProviderProps {
  value: UnwrapRef<UseMarqueeReturn>
}

export interface MarqueeRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface MarqueeRootProviderProps
  extends MarqueeRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { MarqueeProvider } from './use-marquee-context'

const props = defineProps<MarqueeRootProviderProps>()
const marquee = computed(() => props.value)

MarqueeProvider(marquee)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
