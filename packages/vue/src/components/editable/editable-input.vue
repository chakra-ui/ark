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
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useFieldContext } from '../field'

defineProps<EditableInputProps>()
const editable = useEditableContext()
const field = useFieldContext()
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
