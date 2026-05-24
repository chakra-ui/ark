<script lang="ts">
import type { ItemGroupProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps {}
export interface MenuItemGroupProps
  extends
    MenuItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemGroupProvider } from './use-menu-item-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<MenuItemGroupProps>()

const menu = useMenuContext()

const uid = useId()
const id = props.id ?? uid

const itemGroupProps = computed(() => ({ id }))

MenuItemGroupProvider(itemGroupProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemGroupProps(itemGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
