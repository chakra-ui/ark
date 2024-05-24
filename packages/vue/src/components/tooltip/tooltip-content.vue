<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipContentProps
  extends PolymorphicProps,
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
</script>

<template>
  <ark.div v-bind="tooltip.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
