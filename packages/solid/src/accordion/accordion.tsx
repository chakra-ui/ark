import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<HTMLArkProps<'div'>, UseAccordionProps>

export const Accordion = (props: AccordionProps) => {
  const [accordionProps, divProps] = createSplitProps<UseAccordionProps>()(props, [
    'collapsible',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'multiple',
    'onChange',
    'value',
    'orientation',
  ])

  const accordion = useAccordion(accordionProps)
  const mergedProps = mergeProps(accordion().rootProps, divProps)

  return (
    <AccordionProvider value={accordion}>
      <ark.div {...mergedProps} />
    </AccordionProvider>
  )
}
