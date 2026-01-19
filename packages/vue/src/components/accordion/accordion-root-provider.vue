<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UseAccordionReturn } from './use-accordion'

interface RootProviderProps {
  value: UnwrapRef<UseAccordionReturn>
}

export interface AccordionRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface AccordionRootProviderProps
  extends
    AccordionRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { AccordionProvider } from './use-accordion-context'

const props = defineProps<AccordionRootProviderProps>()
const accordion = computed(() => props.value)

AccordionProvider(accordion)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))
useForwardExpose()
</script>

<template>
  <ark.div v-bind="accordion.getRootProps()" :as-child="asChild">
    <slot></slot>
  </ark.div>
</template>
