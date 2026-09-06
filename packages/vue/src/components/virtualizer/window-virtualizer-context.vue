<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

export interface WindowVirtualizerContextProps extends SlotsType<{
  default: { context: UnwrapRef<UseWindowVirtualizerContext> }
}> {}
</script>

<script setup lang="ts">
import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

const virtualizer = useWindowVirtualizerContext()

defineSlots<{
  default(props: { context: UnwrapRef<UseWindowVirtualizerContext> }): unknown
}>()
</script>

<template>
  <slot :context="virtualizer"></slot>
</template>
