import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = forwardRef<HTMLDivElement, AccordionItemIndicatorProps>(
  (props, ref) => {
    const context = useAccordionContext()
    const itemContext = useAccordionItemContext()
    const mergedProps = mergeProps(context.getItemIndicatorProps(itemContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

AccordionItemIndicator.displayName = 'AccordionItemIndicator'
