import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export type AccordionProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, UseAccordionProps>

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
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
    'orientation',
  ])
  const accordion = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(accordion.rootProps, divProps)

  return (
    <AccordionProvider value={accordion}>
      <ark.div {...mergedProps} ref={ref} />
    </AccordionProvider>
  )
})

Accordion.displayName = 'Accordion'
