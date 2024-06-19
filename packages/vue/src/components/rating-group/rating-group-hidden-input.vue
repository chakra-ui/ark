<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface RatingGroupHiddenInputBaseProps extends PolymorphicProps {}
export interface RatingGroupHiddenInputProps
  extends RatingGroupHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useRatingGroupContext } from './use-rating-group-context'

defineProps<RatingGroupHiddenInputProps>()
const ratingGroup = useRatingGroupContext()
</script>

<template>
  <ark.input v-bind="ratingGroup.getHiddenInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
