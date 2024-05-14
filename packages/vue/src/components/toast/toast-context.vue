<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseToastContext } from './use-toast-context'

export interface ToastContextProps
  extends SlotsType<{
    default: UnwrapRef<UseToastContext>
  }> {}
</script>

<script setup lang="ts">
import { useToastContext } from './use-toast-context'

const toast = useToastContext()

defineSlots<{
  default(toast: UnwrapRef<UseToastContext>): unknown
}>()
</script>

<template>
  <slot v-bind="toast"></slot>
</template>
