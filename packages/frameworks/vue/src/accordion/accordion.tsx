import { computed, defineComponent } from 'vue'
import { ark } from '../factory'
import { PresencePropsProvider } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { AccordionProvider } from './accordion-context'
import { emits, props, type AccordionRootProps } from './accordion.props'
import { useAccordion } from './use-accordion'

export const Accordion = defineComponent<AccordionRootProps>(
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
    name: 'Accordion',
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
