<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RatingGroupControlProps>()

const ratingGroup = useRatingGroupContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="ratingGroup.getControlProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
