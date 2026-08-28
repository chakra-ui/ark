<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTabsContext } from './use-tabs-context.ts'

export interface TabsContextProps extends SlotsType<{
  default: UnwrapRef<UseTabsContext>
}> {}
</script>

<script setup lang="ts">
import { useTabsContext } from './use-tabs-context.ts'

const tabs = useTabsContext()

defineSlots<{
  default(tabs: UnwrapRef<UseTabsContext>): unknown
}>()
</script>

<template>
  <slot v-bind="tabs"></slot>
</template>
