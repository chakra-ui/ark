<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface AccordionItemIndicatorBaseProps extends PolymorphicProps {}
export interface AccordionItemIndicatorProps
  extends
    AccordionItemIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useAccordionContext } from './use-accordion-context.ts'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

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
