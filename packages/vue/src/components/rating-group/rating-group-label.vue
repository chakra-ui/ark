<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface RatingGroupLabelBaseProps extends PolymorphicProps {}
export interface RatingGroupLabelProps
  extends
    RatingGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useRatingGroupContext } from './use-rating-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RatingGroupLabelProps>()
const ratingGroup = useRatingGroupContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="ratingGroup.getLabelProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
