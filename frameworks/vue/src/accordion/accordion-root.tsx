import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { RenderStrategyProvider, type RenderStrategyProps } from '../render-strategy'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { emits, props } from './accordion.props'
import { useAccordion, type UseAccordionProps } from './use-accordion'

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
        {slots.default?.(api.value)}
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
