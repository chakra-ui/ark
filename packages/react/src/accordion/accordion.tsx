import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLAtlasProps<'div'>, UseAccordionProps>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const [useAccordionProps, rootProps] = splitProps(props, [
    'collapsible',
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'ids',
    'multiple',
    'onChange',
    'value',
  ])
  const accordion = useAccordion(useAccordionProps)

  return (
    <AccordionProvider value={accordion}>
      <atlas.div {...accordion.rootProps} {...rootProps} ref={ref} />
    </AccordionProvider>
  )
})
