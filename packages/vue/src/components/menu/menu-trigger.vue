<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuTriggerBaseProps extends PolymorphicProps {}
export interface MenuTriggerProps
  extends MenuTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuTriggerProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="menu.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
