<script lang="ts">
import type { ItemProps, ItemState } from '@zag-js/accordion'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface AccordionItemState extends ItemState {}
export interface AccordionItemBaseProps extends ItemProps, PolymorphicProps {}
export interface AccordionItemProps
  extends
    AccordionItemBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRenderStrategyProps } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { Collapsible } from '../collapsible/index.ts'
import { useAccordionContext } from './use-accordion-context.ts'
import { AccordionItemProvider } from './use-accordion-item-context.ts'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context.ts'

const accordion = useAccordionContext()
const props = defineProps<AccordionItemProps>()

defineSlots<PolymorphicSlots<AccordionItemState>>()
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
    :state="item"
    :open="item.expanded"
    :lazy-mount="renderStrategyProps.lazyMount"
    :unmount-on-exit="renderStrategyProps.unmountOnExit"
    :ids="{ content: itemContentProps.id }"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </Collapsible.Root>
</template>
