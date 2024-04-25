<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface HoverCardArrowTipProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardArrowTipProps>()
const hoverCard = useHoverCardContext()
</script>

<template>
  <ark.div v-bind="hoverCard.arrowTipProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
