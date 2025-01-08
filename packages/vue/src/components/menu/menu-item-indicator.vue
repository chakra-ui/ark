<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuItemIndicatorBaseProps extends PolymorphicProps {}
export interface MenuItemIndicatorProps
  extends MenuItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-props-context'
import { useForwardExpose } from '../../utils'

defineProps<MenuItemIndicatorProps>()

const menu = useMenuContext()
const optionItemProps = useMenuOptionItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemIndicatorProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
