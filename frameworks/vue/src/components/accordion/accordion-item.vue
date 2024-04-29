<script lang="ts">
import type { ItemProps } from '@zag-js/accordion'
import type { PolymorphicProps } from '../factory'

export interface AccordionItemProps extends ItemProps, PolymorphicProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRenderStrategyProps } from '../../utils'
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
