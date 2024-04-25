<script lang="ts">
import type { RootEmits, RootProps } from './rating-group.types'

export interface RatingGroupRootProps extends RootProps, PolimoprhicProps {}
export interface RatingGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolimoprhicProps } from '../factory'
import { useRatingGroup } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

const props = defineProps<RatingGroupRootProps>()
const emits = defineEmits<RatingGroupRootEmits>()

const ratingGroup = useRatingGroup(props, emits)
RatingGroupProvider(ratingGroup)
</script>

<template>
  <ark.div v-bind="ratingGroup.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>

