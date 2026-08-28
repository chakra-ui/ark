<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

defineProps<DrawerCloseTriggerProps>()
const drawer = useDrawerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="drawer.getCloseTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
