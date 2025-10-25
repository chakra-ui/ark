<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './marquee.types'

export interface MarqueeRootBaseProps extends RootProps, PolymorphicProps {}
export interface MarqueeRootProps
  extends MarqueeRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface MarqueeRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useMarquee } from './use-marquee'
import { MarqueeProvider } from './use-marquee-context'

const props = withDefaults(defineProps<MarqueeRootProps>(), {
  autoFill: undefined,
  defaultPaused: undefined,
  pauseOnInteraction: undefined,
  paused: undefined,
  reverse: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<MarqueeRootEmits>()

const marquee = useMarquee(props, emits)
MarqueeProvider(marquee)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="marquee.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
