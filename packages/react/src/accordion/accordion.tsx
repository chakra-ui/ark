import type { Context } from '@zag-js/accordion'
import { AccordionProvider } from './accordion-context'
import { useAccordion } from './use-accordion'
import { forwardRef } from '../forwardRef'
import { atlas } from '../factory'

export type AccordionProps = Omit<Context, 'id'>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const { api, htmlProps } = useAccordion(props)

  return (
    <AccordionProvider value={{ api }}>
      <atlas.div {...api.rootProps} {...htmlProps} ref={ref} />
    </AccordionProvider>
  )
})
