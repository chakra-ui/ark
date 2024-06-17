<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuPositionerBaseProps extends PolymorphicProps {}
export interface MenuPositionerProps
  extends MenuPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { Presence } from '../presence'
import { useMenuContext } from './use-menu-context'

defineProps<MenuPositionerProps>()
const menu = useMenuContext()
// TODO is undefined ?!
// const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence v-bind="menu.getPositionerProps()" :present="menu.open">
    <slot />
  </Presence>
</template>
