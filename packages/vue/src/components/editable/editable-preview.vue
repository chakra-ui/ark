<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface EditablePreviewProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditablePreviewProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.span v-bind="editable.previewProps" :as-child="asChild">
    <slot />
  </ark.span>
</template>
