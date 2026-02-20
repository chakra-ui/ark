<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerTriggerBaseProps extends PolymorphicProps {}
export interface DrawerTriggerProps
  extends
    DrawerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils'

defineProps<DrawerTriggerProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.button v-bind="drawer.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
