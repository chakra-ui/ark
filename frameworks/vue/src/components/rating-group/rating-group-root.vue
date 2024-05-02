<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RootEmits, RootProps } from './rating-group.types'

export interface RatingGroupRootProps extends RootProps, PolymorphicProps {}
export interface RatingGroupRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useRatingGroup } from './use-rating-group'
import { RatingGroupProvider } from './use-rating-group-context'

const defaults: BooleanDefaults<RootProps> = {
  allowHalf: undefined,
  autoFocus: undefined,
  disabled: undefined,
  readOnly: undefined,
}
const props = withDefaults(defineProps<RatingGroupRootProps>(), defaults)
const emits = defineEmits<RatingGroupRootEmits>()

const ratingGroup = useRatingGroup(props, emits)
RatingGroupProvider(ratingGroup)
</script>

<template>
  <ark.div v-bind="ratingGroup.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
