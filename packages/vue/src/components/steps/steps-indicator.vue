<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsIndicatorBaseProps extends PolymorphicProps {}
export interface StepsIndicatorProps
  extends StepsIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

defineProps<StepsIndicatorProps>()
const steps = useStepsContext()
const itemProps = useStepsItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
