<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseMenuContext } from './use-menu-context'

export interface MenuContextProps
  extends SlotsType<{
    default: UnwrapRef<UseMenuContext>
  }> {}
</script>

<script setup lang="ts">
import { useMenuContext } from './use-menu-context'

const menu = useMenuContext()

defineSlots<{
  default(menu: UnwrapRef<UseMenuContext>): unknown
}>()
</script>

<template>
  <slot v-bind="menu"></slot>
</template>
