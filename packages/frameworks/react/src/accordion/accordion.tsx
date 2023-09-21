import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { AccordionProvider } from './accordion-context'
import { useAccordion, type UseAccordionProps } from './use-accordion'

export interface AccordionProps extends Assign<HTMLArkProps<'div'>, UseAccordionProps> {}

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
    'onFocusChange',
    'onValueChange',
    'orientation',
    'value',
  ])
  const api = useAccordion(useAccordionProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <AccordionProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </AccordionProvider>
  )
})

Accordion.displayName = 'Accordion'
