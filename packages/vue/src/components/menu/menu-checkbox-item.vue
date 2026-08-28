<script lang="ts">
import type { OptionItemProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { ComputedRef } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'

type CheckboxItemProps = Omit<OptionItemProps, 'type' | 'onCheckedChange'>

export interface MenuCheckboxItemBaseProps extends CheckboxItemProps, PolymorphicProps {}
export interface MenuCheckboxItemProps
  extends
    MenuCheckboxItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

export type MenuCheckboxItemEmits = {
  'update:checked': [value: boolean]
}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { computed } from 'vue'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemProvider } from './use-menu-item-context.ts'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), {
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
MenuItemPropsProvider(optionItemProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getOptionItemProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
