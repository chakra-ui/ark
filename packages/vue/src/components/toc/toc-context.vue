<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTocContext } from './use-toc-context'

export interface TocContextProps extends SlotsType<{
  default: UnwrapRef<UseTocContext>
}> {}
</script>

<script setup lang="ts">
import { useTocContext } from './use-toc-context'

const toc = useTocContext()

defineSlots<{
  default(toc: UnwrapRef<UseTocContext>): unknown
}>()
</script>

<template>
  <slot v-bind="toc"></slot>
</template>
