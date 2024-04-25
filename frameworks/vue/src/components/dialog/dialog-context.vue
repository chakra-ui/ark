<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseDialogContext } from './use-dialog-context'

export interface DialogContextProps
  extends SlotsType<{
    default: UnwrapRef<UseDialogContext>
  }> {}
</script>

<script setup lang="ts">
import { useDialogContext } from './use-dialog-context'

const dialog = useDialogContext()

defineSlots<{
  default(dialog: UnwrapRef<UseDialogContext>): unknown
}>()
</script>

<template>
  <slot v-bind="dialog"></slot>
</template>
