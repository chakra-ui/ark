<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { type UseAccordionItemContext, useAccordionItemContext } from './use-accordion-item-context'

const item = useAccordionItemContext()

defineSlots<{
  default(props: {
    item: UnwrapRef<UseAccordionItemContext>
  }): any
}>()
</script>

<template>
  <slot :item="item"></slot>
</template>