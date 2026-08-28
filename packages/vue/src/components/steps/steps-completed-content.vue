<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface StepsCompletedContentBaseProps extends PolymorphicProps {}
export interface StepsCompletedContentProps
  extends
    StepsCompletedContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<StepsCompletedContentProps>()

const steps = useStepsContext()
const itemProps = computed(() => ({ index: steps.value.count }))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getContentProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
