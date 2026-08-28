<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { UseAccordionReturn } from './use-accordion.ts'

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
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { AccordionProvider } from './use-accordion-context.ts'

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
