import type { Context } from '@zag-js/accordion'
import { HTMLProps } from 'react'
import { AccordionProvider } from './accordion-context'
import { useAccordion } from './use-accordion'

export type AccordionProps = HTMLProps<HTMLDivElement> & Omit<Context, 'id'>

export const Accordion = (props: AccordionProps) => {
  const { api, htmlProps } = useAccordion(props)

  return (
    <AccordionProvider value={{ api }}>
      <div {...api.rootProps} {...htmlProps} />
    </AccordionProvider>
  )
}
