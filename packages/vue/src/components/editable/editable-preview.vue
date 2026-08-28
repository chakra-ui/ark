<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="editable.getPreviewProps()" :as-child="asChild">
    <slot />
  </ark.span>
</template>
