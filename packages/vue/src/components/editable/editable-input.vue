<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableInputBaseProps extends PolymorphicProps {}
export interface EditableInputProps
  extends EditableInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { useEditableContext } from './use-editable-context'

defineProps<EditableInputProps>()
const editable = useEditableContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="editable.getInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
