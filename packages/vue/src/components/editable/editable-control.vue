<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface EditableControlProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useEditableContext } from './use-editable-context'

defineProps<EditableControlProps>()
const editable = useEditableContext()
</script>

<template>
  <ark.div v-bind="editable.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
