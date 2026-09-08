<script lang="ts">
import type { RootState } from '@zag-js/number-input'
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { UseNumberInputReturn } from './use-number-input.ts'

interface RootProviderProps {
  value: UnwrapRef<UseNumberInputReturn>
}

export interface NumberInputRootProviderState extends RootState {}
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

defineSlots<PolymorphicSlots<NumberInputRootProviderState>>()
const numberInput = computed(() => props.value)

NumberInputProvider(numberInput)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="numberInput.getRootProps()" :state="numberInput.getRootState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
