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
iimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { NumberInputProvider } from './use-number-input-context'
onst props = defineProps<NumberInputRootProviderProps>()
const numberInput = computed(() => props.value)

NumberInputProvider(numberInput)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="numberInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
