<script lang="ts">
import type { TriggerProps } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DrawerTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface DrawerTriggerProps
  extends
    DrawerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'

const props = defineProps<DrawerTriggerProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.button v-bind="drawer.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
