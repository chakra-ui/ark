<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface TourContentBaseProps extends PolymorphicProps {}
export interface TourContentProps
  extends TourContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTourContext } from './use-tour-context'
import { useForwardExpose } from '../../utils'

defineProps<TourContentProps>()

const tour = useTourContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(tour.value.getContentProps(), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
