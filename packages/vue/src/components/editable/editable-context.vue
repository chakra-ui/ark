<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseEditableContext } from './use-editable-context'

export interface EditableContextProps
  extends SlotsType<{
    default: UnwrapRef<UseEditableContext>
  }> {}
</script>

<script setup lang="ts">
import { useEditableContext } from './use-editable-context'

const editable = useEditableContext()

defineSlots<{
  default(editable: UnwrapRef<UseEditableContext>): unknown
}>()
</script>

<template>
  <slot v-bind="editable"></slot>
</template>
