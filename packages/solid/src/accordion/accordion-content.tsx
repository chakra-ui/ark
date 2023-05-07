import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'>

export const AccordionContent = (props: AccordionContentProps) => {
  const accordion = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const mergedProps = createMemo(() =>
    mergeProps(accordion().getContentProps(accordionItem), props),
  )
  return <ark.div {...mergedProps()} />
}
