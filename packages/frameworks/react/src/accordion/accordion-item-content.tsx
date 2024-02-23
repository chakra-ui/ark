import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { Collapsible } from '../collapsible'
import { type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(
  (props, ref) => {
    const api = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const { hidden: _, ...itemContentProps } = api.getItemContentProps(accordionItem)
    const mergedProps = mergeProps(itemContentProps, props)

    return <Collapsible.Content ref={ref} {...mergedProps} />
  },
)

AccordionItemContent.displayName = 'AccordionItemContent'
