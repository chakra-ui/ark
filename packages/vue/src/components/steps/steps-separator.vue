<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsSeparatorBaseProps extends PolymorphicProps {}
export interface StepsSeparatorProps
  extends StepsSeparatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

defineProps<StepsSeparatorProps>()
const steps = useStepsContext()
const itemProps = useStepsItemPropsContext()
</script>

<template>
  <ark.div v-bind="steps.getSeparatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
