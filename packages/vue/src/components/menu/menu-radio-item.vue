<script lang="ts">
import type { OptionItemProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'

type RadioItemProps = Omit<OptionItemProps, 'type' | 'onCheckedChange' | 'checked'>
export interface MenuRadioItemProps
  extends PolymorphicProps,
    RadioItemProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed, type ComputedRef } from 'vue'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

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

const item = computed(() => menu.value.getOptionItemState(optionItemProps.value))

MenuItemProvider(item)
MenuOptionItemPropsProvider(optionItemProps)
</script>

<template>
  <ark.div v-bind="menu.getOptionItemProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
