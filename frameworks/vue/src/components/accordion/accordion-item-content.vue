<script lang="ts">
import type { PolymorphicProps } from '../factory'
import { createSplitProps } from '../create-split-props'

export interface AccordionItemContentProps extends PolymorphicProps {}

interface VisibilityProps {
  hidden?: boolean
  'data-state'?: string
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Collapsible } from '../..'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

defineProps<AccordionItemContentProps>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()

const itemContentProps = computed(() => {
  const contentProps = accordion.value.getItemContentProps(itemProps)
  const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, [
    'hidden',
    'data-state',
  ])
  return ownProps
})
</script>

<template>
  <Collapsible.Content v-bind="itemContentProps" :as-child="asChild">
    <slot />
  </Collapsible.Content>
</template>
