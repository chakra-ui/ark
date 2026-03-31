<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps {}
export interface DrawerSwipeAreaProps
  extends
    DrawerSwipeAreaBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils'

defineProps<DrawerSwipeAreaProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="drawer.getSwipeAreaProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
