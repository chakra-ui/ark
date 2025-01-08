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
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'

defineProps<StepsListProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.ol v-bind="steps.getListProps()" :as-child="asChild">
    <slot />
  </ark.ol>
</template>
