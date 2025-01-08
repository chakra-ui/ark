<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface HoverCardArrowTipBaseProps extends PolymorphicProps {}
export interface HoverCardArrowTipProps
  extends HoverCardArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardArrowTipProps>()
const hoverCard = useHoverCardContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="hoverCard.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
