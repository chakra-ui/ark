<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface NavigationMenuItemState extends ItemState {}
export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuItemProps
  extends
    NavigationMenuItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { NavigationMenuItemPropsProvider } from './use-navigation-menu-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NavigationMenuItemProps>()

defineSlots<PolymorphicSlots<NavigationMenuItemState>>()
const navigationMenu = useNavigationMenuContext()

const itemProps = computed(() => ({ value: props.value, disabled: props.disabled }))
NavigationMenuItemPropsProvider(itemProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getItemProps(props)" :state="navigationMenu.getItemState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
