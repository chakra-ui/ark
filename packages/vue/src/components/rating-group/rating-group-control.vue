<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface RatingGroupControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

defineProps<RatingGroupControlProps>()

const ratingGroup = useRatingGroupContext()
</script>

<template>
  <ark.div v-bind="ratingGroup.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
