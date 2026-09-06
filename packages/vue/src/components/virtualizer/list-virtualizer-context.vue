<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseListVirtualizerContext } from './use-list-virtualizer-context.ts'

export interface ListVirtualizerContextProps extends SlotsType<{
  default: { context: UnwrapRef<UseListVirtualizerContext> }
}> {}
</script>

<script setup lang="ts">
import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

const virtualizer = useListVirtualizerContext()

defineSlots<{
  default(props: { context: UnwrapRef<UseListVirtualizerContext> }): unknown
}>()
</script>

<template>
  <slot :context="virtualizer"></slot>
</template>
