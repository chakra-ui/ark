<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipPositionerBaseProps extends PolymorphicProps {}
export interface TooltipPositionerProps
  extends
    TooltipPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipPositionerProps>()

const tooltip = useTooltipContext()
const presence = usePresenceContext()

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="tooltip.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
