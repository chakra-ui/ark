<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuContextTriggerBaseProps extends PolymorphicProps {}
export interface MenuContextTriggerProps
  extends MenuContextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuContextTriggerProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.button v-bind="menu.getContextTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
