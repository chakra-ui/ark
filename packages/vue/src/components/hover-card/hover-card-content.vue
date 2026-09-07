<script lang="ts">
import type { ContentState } from '@zag-js/hover-card'
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface HoverCardContentState extends ContentState {}
export interface HoverCardContentBaseProps extends PolymorphicProps {}
export interface HoverCardContentProps
  extends
    HoverCardContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useHoverCardContext } from './use-hover-card-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<HoverCardContentProps>()

defineSlots<PolymorphicSlots<HoverCardContentState>>()

const hoverCard = useHoverCardContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(hoverCard.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="hoverCard.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
