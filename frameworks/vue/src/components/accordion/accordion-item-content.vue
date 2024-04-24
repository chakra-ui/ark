<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface AccordionItemContentProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Collapsible } from '../..'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

defineProps<AccordionItemContentProps>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()

const contentProps = computed(() => {
  const { hidden: _, ...itemContentProps } = accordion.value.getItemContentProps(itemProps)
  return itemContentProps
})
</script>

<template>
  <Collapsible.Content v-bind="contentProps" :as-child="asChild">
    <slot />
  </Collapsible.Content>
</template>
