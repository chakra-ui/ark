<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldInputBaseProps extends PolymorphicProps {}
export interface FieldInputProps
  extends FieldInputBaseProps,
    /**
     * @vue-ignore
     */
    Omit<InputHTMLAttributes, 'value'> {
  modelValue?: InputHTMLAttributes['value']
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

const props = defineProps<FieldInputProps>()
const field = useFieldContext()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <ark.input
    v-bind="field.getInputProps()"
    :as-child="asChild"
    :value="props.modelValue"
    @input="(event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
  >
    <slot />
  </ark.input>
</template>
