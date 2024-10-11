<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemTextBaseProps extends PolymorphicProps {}
export interface MenuItemTextProps
  extends MenuItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useForwardExpose } from '../../utils'

defineProps<MenuItemTextProps>()

const menu = useMenuContext()
const optionItemProps = useMenuOptionItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemTextProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
