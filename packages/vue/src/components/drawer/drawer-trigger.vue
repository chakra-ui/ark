<script lang="ts">
import type { TriggerProps, TriggerState } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DrawerTriggerState extends TriggerState {}
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

defineSlots<PolymorphicSlots<DrawerTriggerState>>()

const drawer = useDrawerContext()
useForwardExpose()
</script>

<template>
  <ark.button v-bind="drawer.getTriggerProps(props)" :state="drawer.getTriggerState(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
