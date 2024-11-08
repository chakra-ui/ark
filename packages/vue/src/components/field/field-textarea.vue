<script lang="ts">
import type { TextareaHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldTextareaBaseProps extends PolymorphicProps {
  /**
   * Whether the textarea should autoresize
   * @default false
   */
  autoresize?: boolean
}
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
import { autoresizeTextarea } from '@zag-js/auto-resize'
import { useForwardExpose } from '../../utils'
import { useFieldContext } from './use-field-context'

const props = defineProps<FieldTextareaProps>()
const field = useFieldContext()
const emit = defineEmits(['update:modelValue'])

useForwardExpose()
</script>

<!-- TODO use ark.textarea -->
<template>
  <textarea
    :ref="autoresizeTextarea"
    v-bind="field.getTextareaProps()"
    :value="modelValue"
    @input="(event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value)"
    :style="props.autoresize ? { resize: 'none', overflow: 'hidden' } : undefined"
  >
    <slot />
  </textarea>
</template>