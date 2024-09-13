<script lang="ts">
import type { TextareaHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldTextareaBaseProps extends PolymorphicProps {}
export interface FieldTextareaProps
  extends FieldTextareaBaseProps,
    /**
     * @vue-ignore
     */
    Omit<TextareaHTMLAttributes, 'value'> {
  modelValue?: TextareaHTMLAttributes['value']
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

const props = defineProps<FieldTextareaProps>()
const field = useFieldContext()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <ark.textarea
    v-bind="field.getTextareaProps()"
    :value="props.modelValue"
    @input="(event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value)"
    :as-child="asChild"
  >
    <slot />
  </ark.textarea>
</template>
