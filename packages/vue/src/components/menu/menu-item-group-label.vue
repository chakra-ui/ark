<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuItemGroupLabelBaseProps extends PolymorphicProps {}
export interface MenuItemGroupLabelProps
  extends MenuItemGroupLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

defineProps<MenuItemGroupLabelProps>()

const menu = useMenuContext()
const itemGroup = useMenuItemGroupContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemGroupLabelProps({ htmlFor: itemGroup.id })" :as-child="asChild">
    <slot />
  </ark.div>
</template>
