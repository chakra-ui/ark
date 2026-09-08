<script lang="ts">
import type { PositionerState } from '@zag-js/popover'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface PopoverPositionerState extends PositionerState {}
export interface PopoverPositionerBaseProps extends PolymorphicProps {}
export interface PopoverPositionerProps
  extends
    PopoverPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { usePopoverContext } from './use-popover-context.ts'

defineProps<PopoverPositionerProps>()

defineSlots<PolymorphicSlots<PopoverPositionerState>>()

const popover = usePopoverContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="popover.getPositionerProps()"
    :state="popover.getPositionerState()"
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
