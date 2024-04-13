import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { HTMLArkProps } from '~/factory'
import { Collapsible } from '../collapsible'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(
  (props, ref) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const { hidden: _, ...itemContentProps } = accordion.getItemContentProps(itemProps)
    const mergedProps = mergeProps(itemContentProps, props)

    return <Collapsible.Content ref={ref} {...mergedProps} />
  },
)

AccordionItemContent.displayName = 'AccordionItemContent'
