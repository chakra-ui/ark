<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AccordionItemIndicatorBaseProps extends PolymorphicProps {}
export interface AccordionItemIndicatorProps
  extends AccordionItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

defineProps<AccordionItemIndicatorProps>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="accordion.getItemIndicatorProps(itemProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
