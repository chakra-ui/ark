<script lang="ts">
import type { TriggerProps } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

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
import { ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<DrawerTriggerProps>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.button v-bind="drawer.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
