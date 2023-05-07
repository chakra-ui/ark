import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = HTMLArkProps<'button'>

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const accordion = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const triggerProps = mergeProps(() => accordion().getTriggerProps(accordionItem), props)
  return <ark.button {...triggerProps} />
}
