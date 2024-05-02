<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './accordion.types'

export interface AccordionRootProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface AccordionRootEmits extends RootEmits {}
interface BooleanProps extends BooleanDefaults<RootProps> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { useAccordion } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

const props = withDefaults(defineProps<AccordionRootProps>(), {
  collapsible: undefined,
  disabled: undefined,
  multiple: undefined,
} satisfies BooleanProps)

const emits = defineEmits<AccordionRootEmits>()

const accordion = useAccordion(props, emits)
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
