<script lang="ts">
import type { ItemGroupProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface MenuItemGroupProps
  extends MenuItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider } from './use-menu-item-group-context'

const props = defineProps<MenuItemGroupProps>()
const menu = useMenuContext()
const id = useId(props.id)
const itemGroupProps = computed(() => ({ id }))

MenuItemGroupProvider(itemGroupProps)
</script>

<template>
  <ark.div v-bind="menu.getItemGroupProps(itemGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
