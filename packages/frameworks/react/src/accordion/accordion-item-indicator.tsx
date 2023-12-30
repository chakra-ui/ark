import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'
import type { UseAccordionReturn } from './use-accordion'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = forwardRef<HTMLDivElement, AccordionItemIndicatorProps>(
  (props, ref) => {
    const api = useAccordionContext() as UseAccordionReturn['api']
    const item = useAccordionItemContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(item), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

AccordionItemIndicator.displayName = 'AccordionItemIndicator'
