<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface EditableEditTriggerBaseProps extends PolymorphicProps {}
export interface EditableEditTriggerProps
  extends
    EditableEditTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useEditableContext } from './use-editable-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<EditableEditTriggerProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="editable.getEditTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
