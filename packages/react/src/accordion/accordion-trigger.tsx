import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (props, ref) => {
    const { getTriggerProps } = useAccordionContext()
    const accordionItem = useAccordionItemContext()
    const mergedProps = mergeProps(getTriggerProps(accordionItem), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

AccordionTrigger.displayName = 'AccordionTrigger'
