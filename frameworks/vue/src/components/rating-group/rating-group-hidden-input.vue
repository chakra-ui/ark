<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface RatingGroupHiddenInputProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

defineProps<RatingGroupHiddenInputProps>()
const ratingGroup = useRatingGroupContext()
</script>

<template>
  <ark.input v-bind="ratingGroup.hiddenInputProps" :as-child="asChild" />
</template>
