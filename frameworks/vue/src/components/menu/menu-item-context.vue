<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseMenuItemContext } from './use-menu-item-context'

export interface MenuItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseMenuItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useMenuItemContext } from './use-menu-item-context'

const item = useMenuItemContext()

defineSlots<{
  default(item: UnwrapRef<UseMenuItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item" />
</template>
