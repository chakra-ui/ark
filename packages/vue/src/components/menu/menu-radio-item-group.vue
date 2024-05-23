<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuRadioItemGroupProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {
  id?: string
  modelValue?: string
}

export type MenuRadioItemGroupEmits = {
  'update:modelValue': [value: string]
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed } from 'vue'
import { useId } from '../../utils'
import { useMenuContext } from './use-menu-context'
import { MenuItemGroupProvider, type UseMenuItemGroupContext } from './use-menu-item-group-context'

const props = defineProps<MenuRadioItemGroupProps>()
const emits = defineEmits<MenuRadioItemGroupEmits>()
const menu = useMenuContext()
const id = useId()

const itemGroupProps: UseMenuItemGroupContext = computed(() => ({
  id: props.id ? props.id : id.value,
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
