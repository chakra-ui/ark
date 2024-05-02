<script lang="ts">
import type { OptionItemProps } from '@zag-js/menu'
import type { PolymorphicProps } from '../factory'
import type { BooleanDefaults } from '../../types'

type RadioItemProps = Omit<OptionItemProps, 'type' | 'onCheckedChange' | 'checked'>
export interface MenuRadioItemProps extends PolymorphicProps, RadioItemProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed, type ComputedRef } from 'vue'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

const defaults: BooleanDefaults<RadioItemProps> = {
  disabled: undefined,
  closeOnSelect: undefined,
}
const props = withDefaults(defineProps<MenuRadioItemProps>(), defaults)
const menu = useMenuContext()
const itemGroup = useMenuItemGroupContext()

const optionItemProps: ComputedRef<OptionItemProps> = computed(() => ({
  ...props,
  checked: itemGroup.value.value === props.value,
  type: 'radio',
  onCheckedChange: () => itemGroup.value.onValueChange?.({ value: props.value }),
}))

const item = computed(() => menu.value.getOptionItemState(optionItemProps.value))

MenuItemProvider(item)
MenuOptionItemPropsProvider(optionItemProps)
</script>

<template>
  <ark.div v-bind="menu.getOptionItemProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
