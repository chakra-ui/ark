import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = HTMLArkProps<'button'>

export const AccordionTrigger = forwardRef<'button'>((props, ref) => {
  const { getTriggerProps } = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const mergedProps = mergeProps(getTriggerProps(accordionItem), props)

  return <ark.button {...mergedProps} ref={ref} />
})
