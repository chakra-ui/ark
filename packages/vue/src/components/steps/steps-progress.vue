<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface StepsProgressBaseProps extends PolymorphicProps {}
export interface StepsProgressProps
  extends
    StepsProgressBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useStepsContext } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<StepsProgressProps>()
const steps = useStepsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getProgressProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
