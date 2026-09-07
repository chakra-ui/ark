<script lang="ts">
import type { PositionerState } from '@zag-js/drawer'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface DrawerPositionerState extends PositionerState {}
export interface DrawerPositionerBaseProps extends PolymorphicProps {}
export interface DrawerPositionerProps
  extends
    DrawerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DrawerPositionerProps>()

defineSlots<PolymorphicSlots<DrawerPositionerState>>()

const drawer = useDrawerContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="drawer.getPositionerProps()"
    :state="drawer.getPositionerState()"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
