import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { emits, props } from './accordion.props'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export interface AccordionProps extends Assign<HTMLArkProps<'div'>, UseAccordionProps> {}

export const Accordion = defineComponent({
  name: 'Accordion',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useAccordion(props, emit)
    AccordionProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
})
