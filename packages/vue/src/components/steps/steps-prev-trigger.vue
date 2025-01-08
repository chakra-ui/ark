<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsPrevTriggerBaseProps extends PolymorphicProps {}
export interface StepsPrevTriggerProps
  extends StepsPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useForwardExpose } from '../../utils'

defineProps<StepsPrevTriggerProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="steps.getPrevTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
