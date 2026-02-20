<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerGrabberIndicatorBaseProps extends PolymorphicProps {}
export interface DrawerGrabberIndicatorProps
  extends
    DrawerGrabberIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils'

defineProps<DrawerGrabberIndicatorProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="drawer.getGrabberIndicatorProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
