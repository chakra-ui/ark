<script lang="ts">
import type { LinkProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuContentBaseProps extends LinkProps, PolymorphicProps {}
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
import { useRenderStrategyProps } from '../../utils/use-render-strategy'
import { usePresence, PresenceProvider } from '../presence'
import { ark } from '../factory'

const props = defineProps<NavigationMenuContentProps>()

const navigationMenu = useNavigationMenuContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({ ...renderStrategy.value, present: navigationMenu.value.value === props.value })),
)

PresenceProvider(presence)

const mergedProps = computed(() =>
  mergeProps(navigationMenu.value.getContentProps(props), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
