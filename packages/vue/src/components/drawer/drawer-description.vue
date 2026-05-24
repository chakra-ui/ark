<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerDescriptionBaseProps extends PolymorphicProps {}
export interface DrawerDescriptionProps
  extends
    DrawerDescriptionBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerDescriptionProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="drawer.getDescriptionProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
