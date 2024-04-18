<script setup lang="ts">
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()
</script>

<template>
  <div v-bind="accordion.getItemIndicatorProps(itemProps)">
  <slot></slot>
  </div>
</template>