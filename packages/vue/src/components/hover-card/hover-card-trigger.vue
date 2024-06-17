<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface HoverCardTriggerBaseProps extends PolymorphicProps {}
export interface HoverCardTriggerProps
  extends HoverCardTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardTriggerProps>()
const hoverCard = useHoverCardContext()
</script>

<template>
  <ark.button v-bind="hoverCard.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
