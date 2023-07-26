import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = HTMLArkProps<'button'>

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const api = useAccordionContext()
  const itemParams = useAccordionItemContext()
  const triggerProps = mergeProps(() => api().getTriggerProps(itemParams), props)
  return <ark.button {...triggerProps} />
}
