<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsTriggerBaseProps extends PolymorphicProps {}
export interface StepsTriggerProps
  extends StepsTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

defineProps<StepsTriggerProps>()

const steps = useStepsContext()
const itemProps = useStepsItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="steps.getTriggerProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
