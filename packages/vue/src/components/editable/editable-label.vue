<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditableLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditableLabelProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.label v-bind="editable.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
