<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AccordionItemContentBaseProps extends PolymorphicProps {}
export interface AccordionItemContentProps
  extends AccordionItemContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}

interface VisibilityProps {
  hidden?: boolean
  'data-state'?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Collapsible } from '../..'
import { useForwardExpose } from '../../utils'
import { createSplitProps } from '../create-split-props'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

const splitVisibilityProps = createSplitProps<VisibilityProps>()

defineProps<AccordionItemContentProps>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()

const itemContentProps = computed(() => {
  const contentProps = accordion.value.getItemContentProps(itemProps)
  const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, ['hidden', 'data-state'])
  return ownProps
})
useForwardExpose()
</script>

<template>
  <Collapsible.Content v-bind="itemContentProps" :as-child="asChild">
    <slot />
  </Collapsible.Content>
</template>
