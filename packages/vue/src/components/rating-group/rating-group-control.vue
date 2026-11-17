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
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<RatingGroupControlProps>()

const ratingGroup = useRatingGroupContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.div :aria-describedby="field?.ariaDescribedby" v-bind="ratingGroup.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
