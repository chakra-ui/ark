import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import type { Assign } from '../split-props'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLAtlasProps<'div'>, UseAccordionProps>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const { api, htmlProps } = useAccordion(props)

  return (
    <AccordionProvider value={api}>
      <atlas.div {...api.rootProps} {...htmlProps} ref={ref} />
    </AccordionProvider>
  )
})
