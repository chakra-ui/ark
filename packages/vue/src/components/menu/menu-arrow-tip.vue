<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuArrowTipBaseProps extends PolymorphicProps {}
export interface MenuArrowTipProps
  extends MenuArrowTipBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuArrowTipProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getArrowTipProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
