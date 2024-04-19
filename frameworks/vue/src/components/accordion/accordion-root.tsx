import { computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type RenderStrategyProps, RenderStrategyProvider } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './accordion.props'
import { type UseAccordionProps, useAccordion } from './use-accordion'
import { AccordionProvider } from './use-accordion-context'

export interface AccordionRootProps
  extends Assign<HTMLArkProps<'div'>, UseAccordionProps>,
    RenderStrategyProps {}

export const AccordionRoot = defineComponent<AccordionRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useAccordion(props, emit)

    const renderStrategyProps = computed(() => ({
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    AccordionProvider(api)
    RenderStrategyProvider(renderStrategyProps)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'AccordionRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
