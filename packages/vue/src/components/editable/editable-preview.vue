<script lang="ts">
import type { PreviewState } from '@zag-js/editable'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface EditablePreviewState extends PreviewState {}
export interface EditablePreviewBaseProps extends PolymorphicProps {}
export interface EditablePreviewProps
  extends
    EditablePreviewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditablePreviewProps>()

defineSlots<PolymorphicSlots<EditablePreviewState>>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="editable.getPreviewProps()" :state="editable.getPreviewState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.span>
</template>
