<script lang="ts">
import type { OptionItemProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'

type RadioItemProps = Omit<OptionItemProps, 'type' | 'onCheckedChange' | 'checked'>

export interface MenuRadioItemBaseProps extends RadioItemProps, PolymorphicProps {}
export interface MenuRadioItemProps
  extends
    MenuRadioItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { computed, type ComputedRef } from 'vue'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemProvider } from './use-menu-item-context.ts'
import { useMenuItemGroupContext } from './use-menu-item-group-context.ts'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<MenuRadioItemProps>(), {
  disabled: undefined,
  closeOnSelect: undefined,
} satisfies BooleanDefaults<RadioItemProps>)

const menu = useMenuContext()
const itemGroup = useMenuItemGroupContext()

const optionItemProps: ComputedRef<OptionItemProps> = computed(() => ({
  ...props,
  checked: itemGroup.value.value === props.value,
  type: 'radio',
  onCheckedChange: () => itemGroup.value.onValueChange?.({ value: props.value }),
}))

const optionItemState = computed(() => menu.value.getOptionItemState(optionItemProps.value))

MenuItemProvider(optionItemState)
MenuItemPropsProvider(optionItemProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getOptionItemProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
