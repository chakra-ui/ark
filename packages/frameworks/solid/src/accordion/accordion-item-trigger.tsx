import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionItemTriggerProps = HTMLArkProps<'button'>

export const AccordionItemTrigger = (props: AccordionItemTriggerProps) => {
  const api = useAccordionContext()
  const item = useAccordionItemContext()
  const mergedProps = mergeProps(() => api().getItemTriggerProps(item), props)

  return <ark.button {...mergedProps} />
}
