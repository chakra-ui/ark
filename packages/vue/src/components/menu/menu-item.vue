<script lang="ts">
import type { ItemProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'

export interface MenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface MenuItemProps
  extends MenuItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: undefined,
  closeOnSelect: undefined,
} satisfies BooleanDefaults<ItemProps>)

const menu = useMenuContext()

MenuItemProvider(computed(() => menu.value.getItemState(props)))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
