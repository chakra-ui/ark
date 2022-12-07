import { children, createEffect, type JSX } from 'solid-js'
import { spread } from 'solid-js/web'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = { children: JSX.Element }

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const accordion = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const getChildren = children(() => props.children)

  createEffect(() => {
    const children = getChildren()
    if (children instanceof Element) {
      spread(children, accordion().getTriggerProps(accordionItem))
    }
  })

  return <>{getChildren()}</>
}
