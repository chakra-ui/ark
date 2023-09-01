import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { AccordionProvider } from './accordion-context'
import { emits, props } from './accordion.props'
import { useAccordion } from './use-accordion'

export type AccordionProps = HTMLArkProps<'div'> & UseAccordionProps

export const Accordion = defineComponent({
  name: 'Accordion',
  emits,
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
