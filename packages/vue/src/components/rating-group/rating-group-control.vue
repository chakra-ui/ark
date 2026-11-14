<script lang="ts">
import type { RootState } from '@zag-js/rating-group'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface RatingGroupControlState extends RootState {}
export interface RatingGroupControlBaseProps extends PolymorphicProps {}
export interface RatingGroupControlProps
  extends
    RatingGroupControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RatingGroupControlProps>()

defineSlots<PolymorphicSlots<RatingGroupControlState>>()

const ratingGroup = useRatingGroupContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.div
    :aria-describedby="field?.ariaDescribedby"
    v-bind="ratingGroup.getControlProps()"
    :state="ratingGroup.getRootState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
