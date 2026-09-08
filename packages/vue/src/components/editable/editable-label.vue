<script lang="ts">
import type { LabelState } from '@zag-js/editable'
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface EditableLabelState extends LabelState {}
export interface EditableLabelBaseProps extends PolymorphicProps {}
export interface EditableLabelProps
  extends
    EditableLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableLabelProps>()

defineSlots<PolymorphicSlots<EditableLabelState>>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="editable.getLabelProps()" :state="editable.getLabelState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.label>
</template>
