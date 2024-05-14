<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface HoverCardArrowProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardArrowProps>()
const hoverCard = useHoverCardContext()
</script>

<template>
  <ark.div v-bind="hoverCard.arrowProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
