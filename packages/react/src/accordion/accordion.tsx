import type { Context } from '@zag-js/accordion'
import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { AccordionProvider } from './accordion-context'
import { useAccordion } from './use-accordion'

export type AccordionProps = Omit<Context, 'id'> & HTMLAtlasProps<'div'>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const { api, htmlProps } = useAccordion(props)

  return (
    <AccordionProvider value={api}>
      <atlas.div {...api.rootProps} {...htmlProps} ref={ref} />
    </AccordionProvider>
  )
})
