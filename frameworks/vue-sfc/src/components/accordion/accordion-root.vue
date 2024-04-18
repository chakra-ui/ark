<script setup lang="ts">
import type { FocusChangeDetails, ValueChangeDetails } from '@zag-js/accordion'
import { type UseAccordionProps, useAccordion } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

export type AccordionRootEmits = {
  focusChange: [details: FocusChangeDetails]
  valueChange: [details: ValueChangeDetails]
}
export interface AccordionRootProps
  extends Omit<UseAccordionProps, 'onFocusChange' | 'onValueChange'> {}

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()

const accordion = useAccordion(props, emits)
AccordionProvider(accordion)
</script>

<template>
  <div v-bind="accordion.rootProps">
  <slot></slot>
  </div>
</template>