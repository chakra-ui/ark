<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerGrabberIndicatorProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="drawer.getGrabberIndicatorProps()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
