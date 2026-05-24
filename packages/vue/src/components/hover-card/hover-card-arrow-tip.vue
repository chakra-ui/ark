<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface HoverCardArrowTipBaseProps extends PolymorphicProps {}
export interface HoverCardArrowTipProps
  extends
    HoverCardArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<HoverCardArrowTipProps>()
const hoverCard = useHoverCardContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="hoverCard.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
