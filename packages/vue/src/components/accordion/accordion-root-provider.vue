<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseAccordionReturn } from './use-accordion'

interface RootProviderProps {
  value: UnwrapRef<UseAccordionReturn>
}

export interface AccordionRootProviderProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { AccordionProvider } from './use-accordion-context'

const props = defineProps<AccordionRootProviderProps>()
const accordion = computed(() => props.value)

AccordionProvider(accordion)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="accordion.rootProps" :as-child="asChild">
    <slot></slot>
  </ark.div>
</template>
