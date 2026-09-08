<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { ItemProps, TriggerState } from '@zag-js/navigation-menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface NavigationMenuTriggerState extends TriggerState {}
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

const props = withDefaults(defineProps<NavigationMenuTriggerProps>(), {
  disabled: undefined,
} satisfies BooleanDefaults<ItemProps>)

defineSlots<PolymorphicSlots<NavigationMenuTriggerState>>()
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
  <ark.button
    v-bind="navigationMenu.getTriggerProps(triggerProps)"
    :state="navigationMenu.getTriggerState(triggerProps)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
