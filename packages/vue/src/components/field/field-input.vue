<script lang="ts">
import type { RootState } from '@zag-js/field'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldInputState extends RootState {}
export interface FieldInputBaseProps extends PolymorphicProps {}
export interface FieldInputProps
  extends
    FieldInputBaseProps,
    /**
     * @vue-ignore
     */
    Omit<InputHTMLAttributes, 'value'> {
  modelValue?: InputHTMLAttributes['value']
}
</script>

<script setup lang="ts">
import { type PolymorphicSlots, ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldInputProps>()
defineSlots<PolymorphicSlots<FieldInputState>>()
const field = useFieldContext()

const emit = defineEmits(['update:modelValue'])

useForwardExpose()
</script>

<template>
  <ark.input
    v-bind="{ ...field?.getInputProps(), ...(modelValue !== undefined ? { value: modelValue } : {}) }"
    :state="field?.getRootState()"
    :as-child="asChild"
    @input="(event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
