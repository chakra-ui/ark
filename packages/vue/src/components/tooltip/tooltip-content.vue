<script lang="ts">
import type { ContentState } from '@zag-js/tooltip'
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'

export interface TooltipContentState extends ContentState {}
export interface TooltipContentBaseProps extends PolymorphicProps {}
export interface TooltipContentProps
  extends
    TooltipContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useTooltipContext } from './use-tooltip-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<TooltipContentProps>()

defineSlots<PolymorphicSlots<TooltipContentState>>()

const tooltip = useTooltipContext()
const presence = usePresenceContext()

const mergedProps = computed(() => mergeProps(tooltip.value.getContentProps(), presence.value.presenceProps))

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild" :state="tooltip.getContentState()">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
