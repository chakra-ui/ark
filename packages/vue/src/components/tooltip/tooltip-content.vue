<script lang="ts">
import { mergeProps } from '@zag-js/vue'
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'
import { usePresenceContext } from '../presence'

export interface TooltipContentBaseProps extends PolymorphicProps {}
export interface TooltipContentProps
  extends TooltipContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipContentProps>()
const tooltip = useTooltipContext()
const presence = usePresenceContext()
const mergedProps = computed(() =>
  mergeProps(tooltip.value.getContentProps(), presence.value.presenceProps),
)
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
