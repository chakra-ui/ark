<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import type { UseNumberInputReturn } from './use-number-input.ts'

interface RootProviderProps {
  value: UnwrapRef<UseNumberInputReturn>
}

export interface NumberInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberInputRootProviderProps
  extends
    NumberInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { NumberInputProvider } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
const props = defineProps<NumberInputRootProviderProps>()
const numberInput = computed(() => props.value)

NumberInputProvider(numberInput)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="numberInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
