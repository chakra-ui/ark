<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './accordion.types.ts'

export interface AccordionRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface AccordionRootProps
  extends
    AccordionRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface AccordionRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useAccordion } from './use-accordion.ts'
import { AccordionProvider } from './use-accordion-context.ts'

const props = withDefaults(defineProps<AccordionRootProps>(), {
  collapsible: undefined,
  disabled: undefined,
  loopFocus: undefined,
  multiple: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<AccordionRootEmits>()

const accordion = useAccordion(props, emits)
AccordionProvider(accordion)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))
useForwardExpose()
</script>

<template>
  <ark.div v-bind="accordion.getRootProps()" :as-child="asChild">
    <slot></slot>
  </ark.div>
</template>
