<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface MenuSeparatorBaseProps extends PolymorphicProps {}
export interface MenuSeparatorProps
  extends
    MenuSeparatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<MenuSeparatorProps>()
const menu = useMenuContext()

useForwardExpose()
</script>

<template>
  <ark.hr v-bind="menu.getSeparatorProps()" :as-child="asChild" />
</template>
