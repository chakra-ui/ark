<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface HoverCardContentProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

defineProps<HoverCardContentProps>()
const hoverCard = useHoverCardContext()
</script>

<template>
  <ark.div v-bind="hoverCard.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
