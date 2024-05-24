<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipArrowProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipArrowProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.div v-bind="tooltip.arrowProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
