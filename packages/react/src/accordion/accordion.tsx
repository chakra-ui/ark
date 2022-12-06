import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { useAccordion, UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLArkProps<'div'>, UseAccordionProps>

export const Accordion = forwardRef<'div', AccordionProps>((props, ref) => {
  const [useAccordionProps, divProps] = createSplitProps<UseAccordionProps>()(props, [
    'collapsible',
    'defaultValue',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'multiple',
    'onChange',
    'value',
  ])
  const accordion = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(accordion.rootProps, divProps)

  return (
    <AccordionProvider value={accordion}>
      <ark.div {...mergedProps} ref={ref} />
    </AccordionProvider>
  )
})
