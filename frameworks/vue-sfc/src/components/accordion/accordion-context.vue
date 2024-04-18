<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { type UseAccordionContext, useAccordionContext } from './use-accordion-context'

const accordion = useAccordionContext()

defineSlots<{
  default(props: {
    accordion: UnwrapRef<UseAccordionContext>
  }): any
}>()
</script>

<template>
  <slot :accordion="accordion"></slot>
</template>