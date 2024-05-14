<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseHoverCardContext } from './use-hover-card-context'

export interface HoverCardContextProps
  extends SlotsType<{
    default: UnwrapRef<UseHoverCardContext>
  }> {}
</script>

<script setup lang="ts">
import { useHoverCardContext } from './use-hover-card-context'

const hoverCard = useHoverCardContext()

defineSlots<{
  default(hoverCard: UnwrapRef<UseHoverCardContext>): unknown
}>()
</script>

<template>
  <slot v-bind="hoverCard"></slot>
</template>
