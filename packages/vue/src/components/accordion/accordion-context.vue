<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseAccordionContext } from './use-accordion-context.ts'

export interface AccordionContextProps extends SlotsType<{
  default: UnwrapRef<UseAccordionContext>
}> {}
</script>

<script setup lang="ts">
import { useAccordionContext } from './use-accordion-context.ts'

const accordion = useAccordionContext()

defineSlots<{
  default(accordion: UnwrapRef<UseAccordionContext>): unknown
}>()
</script>

<template>
  <slot v-bind="accordion"></slot>
</template>
