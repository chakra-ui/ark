<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './number-input.types'

export interface NumberInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface NumberInputRootProps
  extends NumberInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface NumberInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
iimport { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useNumberInput } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'
const props = withDefaults(defineProps<NumberInputRootProps>(), {
  allowMouseWheel: undefined,
  allowOverflow: undefined,
  clampValueOnBlur: undefined,
  disabled: undefined,
  focusInputOnChange: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  spinOnPress: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<NumberInputRootEmits>()

const numberInput = useNumberInput(props, emits)
NumberInputProvider(numberInput)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="numberInput.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
