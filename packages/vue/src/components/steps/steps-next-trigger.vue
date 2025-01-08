<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsNextTriggerBaseProps extends PolymorphicProps {}
export interface StepsNextTriggerProps
  extends StepsNextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'

defineProps<StepsNextTriggerProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="steps.getNextTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
