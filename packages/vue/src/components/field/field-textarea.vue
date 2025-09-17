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
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'
import { unrefElement } from '../../utils/unref-element'

const props = defineProps<FieldTextareaProps>()
const field = useFieldContext()
const emit = defineEmits(['update:modelValue'])

const textareaRef = ref<HTMLTextAreaElement>()

onMounted(() => {
  const node = unrefElement(textareaRef)
  if (!node || !props.autoresize) return
  const cleanup = autoresizeTextarea(node)
  onBeforeUnmount(() => cleanup?.())
})

useForwardExpose()
</script>

<template>
  <ark.textarea
    ref="textareaRef"
    v-bind="field.getTextareaProps()"
    :value="modelValue"
    @input="(event) => emit('update:modelValue', (event.target as HTMLTextAreaElement).value)"
    :style="props.autoresize ? { resize: 'none', overflow: 'hidden' } : undefined"
    :as-child="asChild"
  >
    <slot />
  </ark.textarea>
</template>
