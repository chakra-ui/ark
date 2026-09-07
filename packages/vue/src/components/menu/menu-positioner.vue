<script lang="ts">
import type { PositionerState } from '@zag-js/menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface MenuPositionerState extends PositionerState {}
export interface MenuPositionerBaseProps extends PolymorphicProps {}
export interface MenuPositionerProps
  extends
    MenuPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useMenuContext } from './use-menu-context.ts'

defineProps<MenuPositionerProps>()

defineSlots<PolymorphicSlots<MenuPositionerState>>()

const menu = useMenuContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="menu.getPositionerProps()"
    :state="menu.getPositionerState()"
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
