<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseCommandContext } from './use-command-context.ts'

export interface CommandContextProps extends SlotsType<{
  default: UnwrapRef<UseCommandContext>
}> {}
</script>

<script setup lang="ts">
import { useCommandContext } from './use-command-context.ts'

const command = useCommandContext()

defineSlots<{
  default(command: UnwrapRef<UseCommandContext>): unknown
}>()
</script>

<template>
  <slot v-bind="command"></slot>
</template>
