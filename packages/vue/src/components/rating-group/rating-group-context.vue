<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseRatingGroupContext } from './use-rating-group-context'

export interface RatingGroupContextProps
  extends SlotsType<{
    default: UnwrapRef<UseRatingGroupContext>
  }> {}
</script>

<script setup lang="ts">
import { useRatingGroupContext } from './use-rating-group-context'

const ratingGroup = useRatingGroupContext()

defineSlots<{
  default(ratingGroup: UnwrapRef<UseRatingGroupContext>): unknown
}>()
</script>

<template>
  <slot v-bind="ratingGroup"></slot>
</template>
