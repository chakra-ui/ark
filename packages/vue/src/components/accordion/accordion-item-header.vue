<script lang="ts">
import type { ItemState } from '@zag-js/accordion'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface AccordionItemHeaderState extends ItemState {}

export interface AccordionItemHeaderBaseProps extends PolymorphicProps {}
export interface AccordionItemHeaderProps
  extends
    AccordionItemHeaderBaseProps,
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

defineProps<AccordionItemHeaderProps>()
defineSlots<PolymorphicSlots<AccordionItemHeaderState>>()
const accordion = useAccordionContext()
const itemProps = useAccordionItemPropsContext()
useForwardExpose()
</script>

<template>
  <ark.h3
    v-bind="accordion.getItemHeaderProps(itemProps)"
    :state="accordion.getItemState(itemProps)"
    :as-child="asChild"
  >
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.h3>
</template>
