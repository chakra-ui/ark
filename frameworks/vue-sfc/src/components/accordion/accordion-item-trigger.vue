<script setup lang="ts">
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()
</script>

<template>
  <button v-bind="accordion.getItemTriggerProps(itemProps)">
  <slot></slot>
  </button>
</template>