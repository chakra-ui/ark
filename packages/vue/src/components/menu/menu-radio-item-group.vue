<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuRadioItemGroupBaseProps extends PolymorphicProps {}
export interface MenuRadioItemGroupProps
  extends MenuRadioItemGroupBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  id?: string
  modelValue?: string
}

export type MenuRadioItemGroupEmits = {
  'update:modelValue': [value: string]
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed, useId } from 'vue'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider, type UseMenuItemGroupContext } from './use-menu-item-group-context'

const props = defineProps<MenuRadioItemGroupProps>()
const emits = defineEmits<MenuRadioItemGroupEmits>()
const menu = useMenuContext()
const id = props.id ?? (useId() as string)

const itemGroupProps: UseMenuItemGroupContext = computed(() => ({
  id,
  value: props.modelValue,
  onValueChange: (e) => emits('update:modelValue', e.value),
}))

MenuItemGroupProvider(itemGroupProps)
</script>

<template>
  <ark.div v-bind="menu.getItemGroupProps(itemGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
