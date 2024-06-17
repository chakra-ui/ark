import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemIndicatorBaseProps extends PolymorphicProps {}
export interface AccordionItemIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    AccordionItemIndicatorBaseProps {}

export const AccordionItemIndicator = forwardRef<HTMLDivElement, AccordionItemIndicatorProps>(
  (props, ref) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const mergedProps = mergeProps(accordion.getItemIndicatorProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

AccordionItemIndicator.displayName = 'AccordionItemIndicator'
