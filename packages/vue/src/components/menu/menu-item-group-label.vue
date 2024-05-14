<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface MenuItemGroupLabelProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

defineProps<MenuItemGroupLabelProps>()
const menu = useMenuContext()
const itemGroup = useMenuItemGroupContext()
</script>

<template>
  <ark.div v-bind="menu.getItemGroupLabelProps({ htmlFor: itemGroup.id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>
