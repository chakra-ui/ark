<script lang="ts">
import type { InputState } from '@zag-js/editable'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface EditableInputState extends InputState {}
export interface EditableInputBaseProps extends PolymorphicProps {}
export interface EditableInputProps
  extends
    EditableInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableInputProps>()

defineSlots<PolymorphicSlots<EditableInputState>>()
const editable = useEditableContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="editable.getInputProps()"
    :state="editable.getInputState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
