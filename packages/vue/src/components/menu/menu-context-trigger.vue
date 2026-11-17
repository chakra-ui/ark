<script lang="ts">
import type { TriggerProps } from '@zag-js/menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuContextTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuContextTriggerProps
  extends
    MenuContextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<MenuContextTriggerProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="menu.getContextTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
