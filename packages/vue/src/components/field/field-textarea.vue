<script lang="ts">
import type { TextareaHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldTextareaBaseProps extends PolymorphicProps {}
export interface FieldTextareaProps
  extends FieldTextareaBaseProps,
    /**
     * @vue-ignore
     */
    TextareaHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldTextareaProps>()
const field = useFieldContext()
</script>

<template>
  <ark.textarea v-bind="field.getTextareaProps()" :as-child="asChild"><slot /></ark.textarea>
</template>
