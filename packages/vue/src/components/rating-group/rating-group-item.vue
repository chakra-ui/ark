<script lang="ts">
import type { ItemProps } from '@zag-js/rating-group'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RatingGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface RatingGroupItemProps
  extends RatingGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'
import { RatingGroupItemProvider } from './use-rating-group-item-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<RatingGroupItemProps>()
const ratingGroup = useRatingGroupContext()

RatingGroupItemProvider(computed(() => ratingGroup.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.span v-bind="ratingGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
