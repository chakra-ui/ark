<script lang="ts">
import type { ItemProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuItemProps
  extends NavigationMenuItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { NavigationMenuItemPropsProvider } from './use-navigation-menu-item-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuItemProps>()
const navigationMenu = useNavigationMenuContext()

const itemProps = computed(() => ({ value: props.value, disabled: props.disabled }))
NavigationMenuItemPropsProvider(itemProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getItemProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
