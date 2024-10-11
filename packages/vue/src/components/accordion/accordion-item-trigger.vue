<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { useCollapsibleContext } from '../collapsible'
import type { PolymorphicProps } from '../factory'

export interface AccordionItemTriggerBaseProps extends PolymorphicProps {}
export interface AccordionItemTriggerProps
  extends AccordionItemTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { computed } from 'vue'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

defineProps<AccordionItemTriggerProps>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()
const collapsible = useCollapsibleContext()
const triggerProps = computed(() => {
  const { 'aria-controls': ariaControls, ...otherProps } =
    accordion.value.getItemTriggerProps(itemProps)
  return {
    ...otherProps,
    ...(collapsible.value.unmounted ? {} : { 'aria-controls': ariaControls }),
  }
})
useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
