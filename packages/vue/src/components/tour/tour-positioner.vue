<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface TourPositionerBaseProps extends PolymorphicProps {}
export interface TourPositionerProps
  extends
    TourPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useTourContext } from './use-tour-context.ts'

defineProps<TourPositionerProps>()

const tour = useTourContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="tour.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
