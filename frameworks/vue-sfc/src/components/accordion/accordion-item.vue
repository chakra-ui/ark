<script setup lang="ts">
import type { ItemProps } from '@zag-js/accordion'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

export interface AccordionItemProps extends ItemProps {}

const props = defineProps<AccordionItemProps>()
const accordion = useAccordionContext()

AccordionItemProvider(accordion.value.getItemState(props))
AccordionItemPropsProvider(props)
</script>

<template>
  <div v-bind="accordion.getItemProps(props)">
  <slot></slot>
  </div>
</template>