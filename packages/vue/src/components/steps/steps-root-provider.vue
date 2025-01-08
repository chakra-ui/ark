<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseStepsReturn } from './use-steps'

interface RootProviderProps {
  value: UnwrapRef<UseStepsReturn>
}

export interface StepsRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface StepsRootProviderProps
  extends StepsRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { StepsProvider } from './use-steps-context'
import { useForwardExpose } from '../../utils'

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
