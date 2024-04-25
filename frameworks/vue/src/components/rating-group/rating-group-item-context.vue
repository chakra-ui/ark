<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseRatingGroupItemContext } from './use-rating-group-item-context'

export interface RatingGroupItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseRatingGroupItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useRatingGroupItemContext } from './use-rating-group-item-context'

const item = useRatingGroupItemContext()

defineSlots<{
  default(item: UnwrapRef<UseRatingGroupItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>

