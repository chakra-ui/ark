<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseStepsReturn } from './use-steps.ts'

interface RootProviderProps {
  value: UnwrapRef<UseStepsReturn>
}

export interface StepsRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface StepsRootProviderProps
  extends
    StepsRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { StepsProvider } from './use-steps-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<StepsRootProviderProps>()
const steps = computed(() => props.value)

StepsProvider(steps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="steps.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
