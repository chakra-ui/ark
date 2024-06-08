<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableSubmitTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditableSubmitTriggerProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.button v-bind="editable.getSubmitTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
