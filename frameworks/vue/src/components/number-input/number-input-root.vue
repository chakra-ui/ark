<script lang="ts">
import type { RootEmits, RootProps } from './number-input.types'
import type { BooleanDefaults } from '../../types'

export interface NumberInputRootProps extends RootProps, PolymorphicProps {}
export interface NumberInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark, type PolymorphicProps } from '../factory'
import { useNumberInput } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

const defaults: BooleanDefaults<RootProps> = {
  allowMouseWheel: undefined,
  allowOverflow: undefined,
  clampValueOnBlur: undefined,
  disabled: undefined,
  focusInputOnChange: undefined,
  invalid: undefined,
  readOnly: undefined,
  spinOnPress: undefined,
}
const props = withDefaults(defineProps<NumberInputRootProps>(), defaults)
const emits = defineEmits<NumberInputRootEmits>()

const numberInput = useNumberInput(props, emits)
NumberInputProvider(numberInput)
</script>

<template>
  <ark.div v-bind="numberInput.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
