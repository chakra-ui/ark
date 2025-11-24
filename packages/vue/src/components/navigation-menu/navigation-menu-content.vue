<script lang="ts">
import type { LinkProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuContentBaseProps extends Omit<LinkProps, 'value'>, PolymorphicProps {
  value?: LinkProps['value']
}
export interface NavigationMenuContentProps
  extends NavigationMenuContentBaseProps,
    /**
     * @vue-ignore
     */
    Omit<HTMLAttributes, 'onSelect'> {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { usePresence } from '../presence'
import { ark } from '../factory'

const props = defineProps<NavigationMenuContentProps>()

const navigationMenu = useNavigationMenuContext()
const itemContext = useNavigationMenuItemPropsContext()
const renderStrategy = useRenderStrategyProps()

const value = computed(() => props.value ?? itemContext?.value.value)

const contentProps = computed(() => ({ ...props, value: value.value }))

const presence = usePresence(
  computed(() => ({ ...renderStrategy.value, present: navigationMenu.value.value === value.value })),
)

const mergedProps = computed(() =>
  mergeProps(navigationMenu.value.getContentProps(contentProps.value), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
