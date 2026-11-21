<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseCommandItemContext } from './use-command-item-context.ts'

export interface CommandItemContextProps extends SlotsType<{
  default: UnwrapRef<UseCommandItemContext>
}> {}
</script>

<script setup lang="ts">
import { useCommandItemContext } from './use-command-item-context.ts'

const item = useCommandItemContext()

defineSlots<{
  default(item: UnwrapRef<UseCommandItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>
