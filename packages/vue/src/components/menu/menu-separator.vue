<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuSeparatorBaseProps extends PolymorphicProps {}
export interface MenuSeparatorProps
  extends MenuSeparatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuSeparatorProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.hr v-bind="menu.getSeparatorProps()" :as-child="asChild">
    <slot />
  </ark.hr>
</template>
