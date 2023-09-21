import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = forwardRef<HTMLButtonElement, AccordionItemTriggerProps>(
  (props, ref) => {
    const api = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const mergedProps = mergeProps(api.getItemTriggerProps(accordionItem), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

AccordionItemTrigger.displayName = 'AccordionItemTrigger'
