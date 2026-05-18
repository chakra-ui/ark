<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface NavigationMenuIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuIndicatorProps
  extends
    NavigationMenuIndicatorBaseProps,
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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'

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
