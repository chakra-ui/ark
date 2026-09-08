<script lang="ts">
import type { SwipeAreaState } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DrawerSwipeAreaState extends SwipeAreaState {}
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
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerSwipeAreaProps>()

defineSlots<PolymorphicSlots<DrawerSwipeAreaState>>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="drawer.getSwipeAreaProps()" :state="drawer.getSwipeAreaState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
