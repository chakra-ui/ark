<script lang="ts">
import type { TriggerProps } from '@zag-js/menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuTriggerProps
  extends
    MenuTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<MenuTriggerProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="menu.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
