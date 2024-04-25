<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface RatingGroupControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

defineProps<RatingGroupControlProps>()
  const attrs = useAttrs()

const ratingGroup = useRatingGroupContext()

const controlProps = computed(() => ({
  ...attrs,
  ...ratingGroup.value.controlProps,
}))
</script>

<template>
  <ark.div v-bind="controlProps" :as-child="asChild">
    <slot />
  </ark.div>
  <input v-bind="ratingGroup.hiddenInputProps" />
</template>