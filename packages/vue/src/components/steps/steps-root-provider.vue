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
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { StepsProvider } from './use-steps-context'
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
