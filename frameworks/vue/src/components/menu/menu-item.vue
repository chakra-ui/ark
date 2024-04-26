<script lang="ts">
import type { ItemProps } from '@zag-js/menu'
import type { PolymorphicProps } from '../factory'

export interface MenuItemProps extends PolymorphicProps, ItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed } from 'vue'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

const props = withDefaults(defineProps<MenuItemProps>(), { closeOnSelect: true })
const menu = useMenuContext()

MenuItemProvider(computed(() => menu.value.getItemState(props)))
</script>

<template>
  <ark.div v-bind="menu.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
