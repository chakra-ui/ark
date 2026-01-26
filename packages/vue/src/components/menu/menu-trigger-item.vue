<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

export interface MenuTriggerItemBaseProps extends PolymorphicProps {}
export interface MenuTriggerItemProps
  extends
    MenuTriggerItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context'

defineProps<MenuTriggerItemProps>()
const triggerItemProps = useMenuTriggerItemContext()

MenuItemPropsProvider(computed(() => ({ value: (triggerItemProps.value as any)?.['data-value'] })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="triggerItemProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
