<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableEditTriggerBaseProps extends PolymorphicProps {}
export interface EditableEditTriggerProps
  extends EditableEditTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useForwardExpose } from '../../utils'

defineProps<EditableEditTriggerProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="editable.getEditTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
