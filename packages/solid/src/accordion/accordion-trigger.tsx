import { children, createEffect, type JSX } from 'solid-js'
import { spread } from '../spread'
import { ssrSpread } from '../ssr-spread'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = { children: JSX.Element }

export const AccordionTrigger = (props: AccordionTriggerProps) => {
  const accordion = useAccordionContext()
  const accordionItem = useAccordionItemContext()

  const triggerProps = accordion().getTriggerProps(accordionItem)

  const getChildren = children(() => ssrSpread(props.children, triggerProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement) {
      spread(children, triggerProps)
    }
  })

  return getChildren
}
