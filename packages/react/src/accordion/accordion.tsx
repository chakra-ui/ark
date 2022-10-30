import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'
import { Assign } from '../split-props'

export type AccordionProps = Assign<HTMLAtlasProps<'div'>, UseAccordionProps>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const { api, htmlProps } = useAccordion(props)

  return (
    <AccordionProvider value={api}>
      <atlas.div {...api.rootProps} {...htmlProps} ref={ref} />
    </AccordionProvider>
  )
})
