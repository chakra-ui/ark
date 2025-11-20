<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuIndicatorProps
  extends NavigationMenuIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { ark } from '../factory'
import { usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'

defineProps<NavigationMenuIndicatorProps>()

const navigationMenu = useNavigationMenuContext()
const renderStrategy = useRenderStrategyProps()
const presence = usePresence(computed(() => ({ ...renderStrategy.value, present: navigationMenu.value.open })))

const mergedProps = computed(() => mergeProps(navigationMenu.value.getIndicatorProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
