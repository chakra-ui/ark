<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsListBaseProps extends PolymorphicProps {}
export interface StepsListProps
  extends StepsListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useForwardExpose } from '../../utils'

defineProps<StepsListProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
