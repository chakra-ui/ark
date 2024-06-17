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

defineProps<EditableInputProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.input v-bind="editable.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
