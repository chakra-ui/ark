<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { UseNumberInputReturn } from './use-number-input'

interface RootProviderProps {
  value: UnwrapRef<UseNumberInputReturn>
}

export interface NumberInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberInputRootProviderProps
  extends NumberInputRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { NumberInputProvider } from './use-number-input-context'
import { useForwardExpose } from '../../utils'
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
