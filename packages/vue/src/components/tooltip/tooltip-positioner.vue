<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useTooltipContext } from './use-tooltip-context.ts'

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
