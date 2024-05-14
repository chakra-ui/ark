<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface MenuArrowTipProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuArrowTipProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.div v-bind="menu.arrowTipProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
