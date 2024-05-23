<script lang="ts">
import type { OptionItemProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { ComputedRef } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { PolymorphicProps } from '../factory'

type CheckboxItemProps = Omit<OptionItemProps, 'type' | 'onCheckedChange'>
export interface MenuCheckboxItemProps
  extends PolymorphicProps,
    CheckboxItemProps,
    /* @vue-ignore */ HTMLAttributes {}

export type MenuCheckboxItemEmits = {
  'update:checked': [value: boolean]
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed } from 'vue'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuOptionItemPropsProvider } from './use-menu-option-item-props-context'

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

const item = computed(() => menu.value.getOptionItemState(optionItemProps.value))

MenuItemProvider(item)
MenuOptionItemPropsProvider(optionItemProps)
</script>

<template>
  <ark.div v-bind="menu.getOptionItemProps(optionItemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
