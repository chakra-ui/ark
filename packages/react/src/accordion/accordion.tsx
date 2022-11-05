import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLAtlasProps<'div'>, UseAccordionProps>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const [useAccordionProps, divProps] = splitProps(props, [
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
  const mergedProps = mergeProps(accordion.rootProps, divProps)

  return (
    <AccordionProvider value={accordion}>
      <atlas.div {...mergedProps} ref={ref} />
    </AccordionProvider>
  )
})
