<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface RatingGroupLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

defineProps<RatingGroupLabelProps>()
const ratingGroup = useRatingGroupContext()
</script>

<template>
  <ark.label v-bind="ratingGroup.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
