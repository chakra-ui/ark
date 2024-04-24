<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface AccordionItemIndicatorProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

defineProps<AccordionItemIndicatorProps>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()
</script>

<template>
  <ark.div v-bind="accordion.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
