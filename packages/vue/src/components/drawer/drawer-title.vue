<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerTitleBaseProps extends PolymorphicProps {}
export interface DrawerTitleProps
  extends
    DrawerTitleBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerTitleProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.h2 v-bind="drawer.getTitleProps()" :as-child="asChild">
    <slot />
  </ark.h2>
</template>
