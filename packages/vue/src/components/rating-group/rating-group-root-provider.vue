<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseRatingGroupReturn } from './use-rating-group'

interface RootProviderProps {
  value: UnwrapRef<UseRatingGroupReturn>
}

export interface RatingGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface RatingGroupRootProviderProps
  extends RatingGroupRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { RatingGroupProvider } from './use-rating-group-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<RatingGroupRootProviderProps>()
const ratingGroup = computed(() => props.value)

RatingGroupProvider(ratingGroup)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="ratingGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
