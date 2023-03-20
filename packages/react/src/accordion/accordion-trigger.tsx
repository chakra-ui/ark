import { Children, cloneElement, type ReactElement } from 'react'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = { children: ReactElement }

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const { getTriggerProps } = useAccordionContext()
  const itemContext = useAccordionItemContext()

  const onlyChild = Children.only(props.children)
  return cloneElement(onlyChild, getTriggerProps(itemContext))
}
