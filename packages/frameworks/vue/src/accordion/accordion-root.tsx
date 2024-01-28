import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresencePropsProvider, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { emits, props } from './accordion.props'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export interface AccordionRootProps
  extends Assign<HTMLArkProps<'div'>, UseAccordionProps>,
    UsePresenceProps {}

export const AccordionRoot = defineComponent<AccordionRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useAccordion(props, emit)

    const presenceProps = computed(() => ({
      present: props.present,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    AccordionProvider(api)
    PresencePropsProvider(presenceProps)

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
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
