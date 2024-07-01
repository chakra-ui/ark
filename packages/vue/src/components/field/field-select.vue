<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldSelectBaseProps extends PolymorphicProps {}
export interface FieldSelectProps
  extends FieldSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldSelectProps>()
const field = useFieldContext()
</script>

<template>
  <ark.select v-bind="field.getSelectProps()" :as-child="asChild"><slot /></ark.select>
</template>
