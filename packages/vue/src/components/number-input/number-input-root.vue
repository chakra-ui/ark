<script lang="ts">
import type { RootState } from '@zag-js/number-input'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import type { RootEmits, RootProps } from './number-input.types.ts'

export interface NumberInputRootState extends RootState {}
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

defineSlots<PolymorphicSlots<NumberInputRootState>>()

const emits = defineEmits<NumberInputRootEmits>()

const numberInput = useNumberInput(props, emits)
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
