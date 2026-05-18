<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuRadioItemGroupBaseProps extends PolymorphicProps {}
export interface MenuRadioItemGroupProps
  extends
    MenuRadioItemGroupBaseProps,
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
import { ark } from '../factory.ts'
import { computed, useId } from 'vue'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemGroupProvider, type UseMenuItemGroupContext } from './use-menu-item-group-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<MenuRadioItemGroupProps>()
const emits = defineEmits<MenuRadioItemGroupEmits>()
const menu = useMenuContext()

const uid = useId()
const id = props.id ?? uid

const itemGroupProps: UseMenuItemGroupContext = computed(() => ({
  id,
  value: props.modelValue,
  onValueChange: (e) => emits('update:modelValue', e.value),
}))

MenuItemGroupProvider(itemGroupProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemGroupProps(itemGroupProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
