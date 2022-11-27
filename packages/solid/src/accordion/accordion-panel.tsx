import { mergeProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = HTMLArkProps<'div'>

export const AccordionPanel = (props: AccordionPanelProps) => {
  const api = useAccordionContext()
  const itemContext = useAccordionItemContext()
  const mergedProps = () => mergeProps(api().getContentProps(itemContext), props)

  return <ark.div {...mergedProps()} />
}
