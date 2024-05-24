<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RatingGroupControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
