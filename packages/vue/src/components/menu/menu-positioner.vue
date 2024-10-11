<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { useRenderStrategyProps } from '../../utils'
import { type PolymorphicProps, ark } from '../factory'

export interface MenuPositionerBaseProps extends PolymorphicProps {}
export interface MenuPositionerProps
  extends MenuPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { PresenceProvider, usePresence } from '../presence'
import { useMenuContext } from './use-menu-context'
import { useForwardExpose } from '../../utils'

defineProps<MenuPositionerProps>()

const menu = useMenuContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: menu.value.open,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="menu.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
