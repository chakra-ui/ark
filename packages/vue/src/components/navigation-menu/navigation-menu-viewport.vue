<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuViewportBaseProps extends PolymorphicProps {}
export interface NavigationMenuViewportProps
  extends
    NavigationMenuViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { usePresence } from '../presence/index.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { getNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'

defineProps<NavigationMenuViewportProps>()

const viewportPropsContext = getNavigationMenuViewportPropsContext()

const navigationMenu = useNavigationMenuContext()
const renderStrategy = useRenderStrategyProps()
const presence = usePresence(computed(() => ({ ...renderStrategy.value, present: navigationMenu.value.open })))

const mergedProps = computed(() =>
  mergeProps(navigationMenu.value.getViewportProps(viewportPropsContext?.value), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
