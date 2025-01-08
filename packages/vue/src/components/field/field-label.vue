<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface FieldLabelBaseProps extends PolymorphicProps {}
export interface FieldLabelProps
  extends FieldLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'

defineProps<FieldLabelProps>()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="field.getLabelProps()" :as-child="asChild"><slot /></ark.label>
</template>
