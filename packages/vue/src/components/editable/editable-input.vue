<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableInputProps
  extends PolymorphicProps,
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
  <ark.input v-bind="editable.getInputProps()" :as-child="asChild" />
</template>
