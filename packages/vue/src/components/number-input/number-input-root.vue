<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './number-input.types.ts'

export interface NumberInputRootBaseProps extends RootProps, PolymorphicProps {}
export interface NumberInputRootProps
  extends
    NumberInputRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface NumberInputRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useNumberInput } from './use-number-input.ts'
import { NumberInputProvider } from './use-number-input-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<NumberInputRootProps>(), {
  allowMouseWheel: undefined,
  allowOverflow: undefined,
  clampValueOnBlur: undefined,
  disabled: undefined,
  focusInputOnChange: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
  snapOnStep: undefined,
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
