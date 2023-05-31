import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'>

export const AccordionContent = (props: AccordionContentProps) => {
  const api = useAccordionContext()
  const itemParams = useAccordionItemContext()
  const contentProps = mergeProps(() => api().getContentProps(itemParams), props)
  return <ark.div {...contentProps} />
}
