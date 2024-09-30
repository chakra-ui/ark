<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableSubmitTriggerBaseProps extends PolymorphicProps {}
export interface EditableSubmitTriggerProps
  extends EditableSubmitTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'
import { useForwardExpose } from '../../utils'

defineProps<EditableSubmitTriggerProps>()
const editable = useEditableContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="editable.getSubmitTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
