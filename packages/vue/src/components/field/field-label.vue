<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface FieldLabelBaseProps extends PolymorphicProps {}
export interface FieldLabelProps
  extends
    FieldLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useFieldContext } from './use-field-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<FieldLabelProps>()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="field.getLabelProps()" :as-child="asChild"><slot /></ark.label>
</template>
