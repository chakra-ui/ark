<script lang="ts">
import type { PositionerState } from '@zag-js/hover-card'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface HoverCardPositionerState extends PositionerState {}
export interface HoverCardPositionerBaseProps extends PolymorphicProps {}
export interface HoverCardPositionerProps
  extends
    HoverCardPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'

defineProps<HoverCardPositionerProps>()

defineSlots<PolymorphicSlots<HoverCardPositionerState>>()

const hoverCard = useHoverCardContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="hoverCard.getPositionerProps()"
    :state="hoverCard.getPositionerState()"
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
