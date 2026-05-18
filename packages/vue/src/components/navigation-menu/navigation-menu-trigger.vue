<script lang="ts">
import type { ItemProps } from '@zag-js/navigation-menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuTriggerBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {}
export interface NavigationMenuTriggerProps
  extends
    NavigationMenuTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ensure } from '@zag-js/utils'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'

const props = defineProps<NavigationMenuTriggerProps>()
const navigationMenu = useNavigationMenuContext()

const itemContext = useNavigationMenuItemPropsContext()
ensure(itemContext?.value, () => 'NavigationMenu.Trigger must be used within NavigationMenu.Item')

const triggerProps = computed(() => ({
  ...props,
  value: itemContext?.value.value,
  disabled: props.disabled ?? itemContext?.value.disabled,
}))

useForwardExpose()
</script>

<template>
  <ark.button v-bind="navigationMenu.getTriggerProps(triggerProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
