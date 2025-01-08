<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface MenuIndicatorBaseProps extends PolymorphicProps {}
export interface MenuIndicatorProps
  extends MenuIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useMenuContext } from './use-menu-context'

defineProps<MenuIndicatorProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="menu.getIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
