import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = HTMLArkProps<'button'>

export const AccordionButton = (props: AccordionButtonProps) => {
  const api = useAccordionContext()
  const itemContext = useAccordionItemContext()

  return <ark.button {...api().getTriggerProps(itemContext)} {...props} />
}
