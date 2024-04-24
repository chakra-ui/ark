<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'

export interface AccordionItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseAccordionItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useAccordionItemContext, type UseAccordionItemContext } from './use-accordion-item-context'

const item = useAccordionItemContext()
defineSlots<{
  default(item: UnwrapRef<UseAccordionItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>
