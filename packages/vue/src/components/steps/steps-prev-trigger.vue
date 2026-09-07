<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface StepsPrevTriggerBaseProps extends PolymorphicProps {}
export interface StepsPrevTriggerProps
  extends
    StepsPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<StepsPrevTriggerProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="steps.getPrevTriggerProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
