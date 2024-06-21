<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldInputBaseProps extends PolymorphicProps {}
export interface FieldInputProps
  extends FieldInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldInputProps>()
const field = useFieldContext()
</script>

<template>
  <ark.input v-bind="field.getInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
