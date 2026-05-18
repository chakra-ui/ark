<script lang="ts">
import type { ItemProps } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface MenuItemProps
  extends
    MenuItemBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useMenuContext } from './use-menu-context.ts'
import { MenuItemProvider } from './use-menu-item-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context.ts'

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: undefined,
  closeOnSelect: undefined,
} satisfies BooleanDefaults<ItemProps>)

const emit = defineEmits<{
  (e: 'select'): void
}>()

const menu = useMenuContext()
const itemState = computed(() => menu.value.getItemState(props))

MenuItemPropsProvider(computed(() => props))
MenuItemProvider(itemState)

onMounted(() => {
  const cleanup = menu.value.addItemListener({ id: itemState.value.id, onSelect: () => emit('select') })
  onBeforeUnmount(() => cleanup?.())
})

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
