import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { Collapsible } from '../collapsible'
import { type HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(
  (props, ref) => {
    const context = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const { hidden: _, ...itemContentProps } = context.getItemContentProps(itemProps)
    const mergedProps = mergeProps(itemContentProps, props)

    return <Collapsible.Content ref={ref} {...mergedProps} />
  },
)

AccordionItemContent.displayName = 'AccordionItemContent'
