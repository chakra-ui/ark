<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuArrowTipProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuArrowTipProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.div v-bind="menu.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
