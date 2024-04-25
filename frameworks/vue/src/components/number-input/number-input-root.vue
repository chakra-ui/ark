<script lang="ts">
import type { RootEmits, RootProps } from './number-input.types'

export interface NumberInputRootProps extends RootProps, PolymorphicProps {}
export interface NumberInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useNumberInput } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

const props = defineProps<NumberInputRootProps>()
const emits = defineEmits<NumberInputRootEmits>()

const numberInput = useNumberInput(props, emits)
NumberInputProvider(numberInput)
</script>

<template>
  <ark.div v-bind="numberInput.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
