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
import { ark } from '../factory'
import { useFieldContext } from './use-field-context'
import { useForwardExpose } from '../../utils'

defineProps<FieldLabelProps>()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="field.getLabelProps()" :as-child="asChild"><slot /></ark.label>
</template>
