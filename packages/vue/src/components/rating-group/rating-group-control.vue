<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RatingGroupControlBaseProps extends PolymorphicProps {}
export interface RatingGroupControlProps
  extends RatingGroupControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

defineProps<RatingGroupControlProps>()

const ratingGroup = useRatingGroupContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="ratingGroup.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
