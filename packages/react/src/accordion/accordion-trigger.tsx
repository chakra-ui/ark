import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = HtmlArkProps<'button'>

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (props, ref) => {
    const { getTriggerProps } = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const mergedProps = mergeProps(getTriggerProps(accordionItem), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

AccordionTrigger.displayName = 'AccordionTrigger'
