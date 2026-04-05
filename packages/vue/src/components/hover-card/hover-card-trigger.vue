<script lang="ts">
import type { TriggerProps } from '@zag-js/hover-card'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface HoverCardTriggerProps
  extends
    HoverCardTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<HoverCardTriggerProps>()
const hoverCard = useHoverCardContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="hoverCard.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
