<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/rating-group'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface RatingGroupItemState extends ItemState {}
export interface RatingGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface RatingGroupItemProps
  extends
    RatingGroupItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { RatingGroupItemProvider } from './use-rating-group-item-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<RatingGroupItemProps>()

defineSlots<PolymorphicSlots<RatingGroupItemState>>()
const ratingGroup = useRatingGroupContext()

RatingGroupItemProvider(computed(() => ratingGroup.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.span v-bind="ratingGroup.getItemProps(props)" :state="ratingGroup.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
