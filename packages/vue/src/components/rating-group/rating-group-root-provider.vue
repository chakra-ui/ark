<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseRatingGroupReturn } from './use-rating-group'

interface RootProviderProps {
  value: UnwrapRef<UseRatingGroupReturn>
}

export interface RatingGroupRootProviderProps
  extends RootProviderProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { RatingGroupProvider } from './use-rating-group-context'

const props = defineProps<RatingGroupRootProviderProps>()
const ratingGroup = computed(() => props.value)

RatingGroupProvider(ratingGroup)
</script>

<template>
  <ark.div v-bind="ratingGroup.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
