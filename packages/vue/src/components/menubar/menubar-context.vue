<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseMenubarContext } from './use-menubar-context.ts'

export interface MenubarContextProps extends SlotsType<{
  default: UnwrapRef<UseMenubarContext>
}> {}
</script>

<script setup lang="ts">
import { useMenubarContext } from './use-menubar-context.ts'

const menubar = useMenubarContext()

defineSlots<{
  default(menubar: UnwrapRef<UseMenubarContext>): unknown
}>()
</script>

<template>
  <slot v-bind="menubar"></slot>
</template>
