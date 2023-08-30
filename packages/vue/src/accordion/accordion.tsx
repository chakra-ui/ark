import { type Context } from '@zag-js/accordion'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { AccordionProvider } from './accordion-context'
import { props } from './accordion.props'
import { useAccordion } from './use-accordion'

export type AccordionContext = Context & { modelValue?: AccordionContext['value'] }
export type UseAccordionProps = Assign<HTMLArkProps<'div'>, AccordionContext>

export type AccordionProps = Optional<AccordionContext, 'id'>

export const Accordion = defineComponent({
  name: 'Accordion',
  emits: ['change', 'update:modelValue'],
  props,
  setup(props, { slots, attrs, emit }) {
    const { api } = useAccordion(emit, props)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.div>
    )
  },
})
