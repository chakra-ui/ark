<script lang="ts">
import type { ItemProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuViewportProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {}
export interface NavigationMenuViewportProxyProps
  extends NavigationMenuViewportProxyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ensure } from '@zag-js/utils'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

const props = defineProps<NavigationMenuViewportProxyProps>()
const navigationMenu = useNavigationMenuContext()

const itemContext = useNavigationMenuItemPropsContext()
ensure(itemContext?.value, () => 'NavigationMenu.ViewportProxy must be used within NavigationMenu.Item')

const viewportProxyProps = computed(() => ({
  ...props,
  value: itemContext.value.value,
  disabled: props.disabled ?? itemContext.value.disabled,
}))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getViewportProxyProps(viewportProxyProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
