import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'>

export const AccordionContent = (props: AccordionContentProps) => {
  const accordion = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const contentProps = mergeProps(() => accordion().getContentProps(accordionItem), props)
  return <ark.div {...contentProps} />
}
