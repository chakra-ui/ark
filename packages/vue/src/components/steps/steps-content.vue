<script lang="ts">
import type { ItemProps } from '@zag-js/steps'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface StepsContentBaseProps extends PolymorphicProps, ItemProps {}
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

const itemProps = defineProps<StepsContentProps>()
const steps = useStepsContext()
</script>

<template>
  <ark.div v-bind="steps.getContentProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
