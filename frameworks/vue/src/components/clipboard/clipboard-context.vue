<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseClipboardContext } from './use-clipboard-context'

export interface ClipboardContextProps
  extends SlotsType<{
    default: UnwrapRef<UseClipboardContext>
  }> {}
</script>

<script setup lang="ts">
import { useClipboardContext } from './use-clipboard-context'

const clipboard = useClipboardContext()

defineSlots<{
  default(clipboard: UnwrapRef<UseClipboardContext>): unknown
}>()
</script>

<template>
  <slot v-bind="clipboard"></slot>
</template>
