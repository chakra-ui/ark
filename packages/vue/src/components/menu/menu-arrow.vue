<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuArrowBaseProps extends PolymorphicProps {}
export interface MenuArrowProps
  extends MenuArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuArrowProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.div v-bind="menu.getArrowProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
