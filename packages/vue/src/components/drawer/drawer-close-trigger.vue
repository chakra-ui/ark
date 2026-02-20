<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DrawerCloseTriggerBaseProps extends PolymorphicProps {}
export interface DrawerCloseTriggerProps
  extends
    DrawerCloseTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils'

defineProps<DrawerCloseTriggerProps>()
const drawer = useDrawerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="drawer.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
