<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TooltipTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipTriggerProps>()
const tooltip = useTooltipContext()
</script>

<template>
  <ark.button v-bind="tooltip.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
