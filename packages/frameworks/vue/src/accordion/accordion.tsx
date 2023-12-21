import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresencePropsProvider, type UsePresenceProps } from '../presence'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { emits, props } from './accordion.props'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export interface AccordionProps
  extends Assign<HTMLArkProps<'div'>, UseAccordionProps>,
    UsePresenceProps {}

export const Accordion = defineComponent({
  name: 'Accordion',
  props: {
    ...props,
    present: {
      type: Boolean as PropType<UsePresenceProps['present']>,
      default: undefined,
    },
    lazyMount: {
      type: Boolean as PropType<UsePresenceProps['lazyMount']>,
      default: false,
    },
    unmountOnExit: {
      type: Boolean as PropType<UsePresenceProps['unmountOnExit']>,
      default: false,
    },
  },
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useAccordion(props, emit)

    const presenceProps = computed(() => ({
      present: props.present,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    AccordionProvider(api)
    PresencePropsProvider(presenceProps)

    console.log('Accordion', api.value)
    console.log('disabled', computed(() => props.disabled).value)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
