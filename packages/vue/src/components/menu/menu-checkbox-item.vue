<script lang="ts">
import type { OptionItemProps } from '@zag-js/menu'
import type { ComputedRef, HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'

type CheckboxItemProps = Omit<OptionItemProps, 'type' | 'onCheckedChange'>

export interface MenuCheckboxItemBaseProps extends CheckboxItemProps, PolymorphicProps {}
export interface MenuCheckboxItemProps
  extends MenuCheckboxItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type MenuCheckboxItemEmits = {
  'update:checked': [value: boolean]
}
</script>

<script setup lang="ts">
import { ark } from '../facimport { computed } from 'vue'
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'
(defineProps<MenuCheckboxItemProps>(), {
  checked: undefined,
  disabled: undefined,
  closeOnSelect: undefined,
} satisfies BooleanDefaults<CheckboxItemProps>)

const emits = defineEmits<MenuCheckboxItemEmits>()

const menu = useMenuContext()
const optionItemProps: ComputedRef<OptionItemProps> = computed(() => ({
  ...props,
  type: 'checkbox',
  onCheckedChange: (e) => emits('update:checked', e),
}))

const optionItemState = computed(() => menu.value.getOptionItemState(optionItemProps.value))

MenuItemProvider(optionItemState)
MenuOptionItemPropsProvider(optionItemProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getOptionItemProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
