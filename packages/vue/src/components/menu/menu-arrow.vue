<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuArrowProps
  extends PolymorphicProps,
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
  <ark.div v-bind="menu.arrowProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
