<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface MenuPositionerProps extends PolymorphicProps {}
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
  <Presence v-bind="menu.positionerProps" :present="menu.open">
    <slot />
  </Presence>
</template>
