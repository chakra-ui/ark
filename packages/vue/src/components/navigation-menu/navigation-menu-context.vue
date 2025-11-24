<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuContextProps
  extends SlotsType<{
    default: UnwrapRef<UseNavigationMenuContext>
  }> {}
</script>

<script setup lang="ts">
import { useNavigationMenuContext } from './use-navigation-menu-context'

const navigationMenu = useNavigationMenuContext()

defineSlots<{
  default(navigationMenu: UnwrapRef<UseNavigationMenuContext>): unknown
}>()
</script>

<template>
  <slot v-bind="navigationMenu"></slot>
</template>
