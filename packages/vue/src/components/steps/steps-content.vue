<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsContentBaseProps extends PolymorphicProps {}
export interface StepsContentProps
  extends StepsContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { useStepsItemPropsContext } from './use-steps-item-props-context'

defineProps<StepsContentProps>()
const steps = useStepsContext()
const itemProps = useStepsItemPropsContext()
</script>

<template>
  <ark.div v-bind="steps.getContentProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
