<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuContentBaseProps extends PolymorphicProps {}
export interface MenuContentProps
  extends MenuContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuContentProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.div v-bind="menu.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
