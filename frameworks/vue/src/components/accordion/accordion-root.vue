<script lang="ts">
import { type RenderStrategyProps, RenderStrategyProvider } from '../../utils/render-strategy'
import type { PolimoprhicProps } from '../factory'
import type { RootEmits, RootProps } from './accordion.types'

export interface AccordionRootProps extends RootProps, RenderStrategyProps, PolimoprhicProps {}
export interface AccordionRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccordion } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()

const accordion = useAccordion(props, emits)
AccordionProvider(accordion)
RenderStrategyProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <div v-bind="accordion.rootProps" :as-child="asChild">
    <slot></slot>
  </div>
</template>
