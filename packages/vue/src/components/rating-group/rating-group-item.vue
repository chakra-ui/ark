<script lang="ts">
import type { ItemProps } from '@zag-js/rating-group'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<RatingGroupItemProps>()
const ratingGroup = useRatingGroupContext()
const field = useFieldContext()

RatingGroupItemProvider(computed(() => ratingGroup.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.span :aria-describedby="field?.ariaDescribedby" v-bind="ratingGroup.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.span>
</template>
