<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'
import { useMenuItemPropsContext } from './use-menu-option-item-props-context.ts'

export interface MenuItemTextBaseProps extends PolymorphicProps {}
export interface MenuItemTextProps
  extends
    MenuItemTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuItemTextProps>()

const menu = useMenuContext()
const itemProps = useMenuItemPropsContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemTextProps(itemProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
