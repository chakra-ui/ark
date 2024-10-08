<script lang="ts">
import type { ItemProps } from '@zag-js/accordion'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps {}
export interface AccordionItemProps
  extends AccordionItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRenderStrategyProps, useForwardExpose } from '../../utils'
import { Collapsible } from '../collapsible'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

const accordion = useAccordionContext()
const props = defineProps<AccordionItemProps>()
const item = computed(() => accordion.value.getItemState(props))
const renderStrategyProps = useRenderStrategyProps()
const itemContentProps = computed(() => accordion.value.getItemContentProps(props))

AccordionItemProvider(item)
AccordionItemPropsProvider(props)

useForwardExpose()
</script>

<template>
  <Collapsible.Root
    v-bind="accordion.getItemProps(props)"
    :open="item.expanded"
    :lazy-mount="renderStrategyProps.lazyMount"
    :unmount-on-exit="renderStrategyProps.unmountOnExit"
    :ids="{ content: itemContentProps.id }"
  >
    <slot />
  </Collapsible.Root>
</template>
