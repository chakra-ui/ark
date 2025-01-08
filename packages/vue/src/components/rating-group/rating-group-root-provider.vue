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
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { RatingGroupProvider } from './use-rating-group-context'
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
