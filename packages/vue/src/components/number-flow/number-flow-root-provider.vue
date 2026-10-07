<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseNumberFlowReturn } from './use-number-flow.ts'

interface RootProviderProps {
  value: UnwrapRef<UseNumberFlowReturn>
}

export interface NumberFlowRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberFlowRootProviderProps
  extends
    NumberFlowRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { NumberFlowProvider } from './use-number-flow-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NumberFlowRootProviderProps>()
const numberFlow = computed(() => props.value)

NumberFlowProvider(numberFlow)
useForwardExpose()
</script>

<template>
  <ark.span v-bind="numberFlow.getRootProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
