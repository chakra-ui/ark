<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuTriggerProps>()
const menu = useMenuContext()
</script>

<template>
  <ark.button v-bind="menu.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
