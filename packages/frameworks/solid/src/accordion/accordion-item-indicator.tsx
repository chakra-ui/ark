import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator: ArkComponent<'div'> = (props) => {
  const api = useAccordionContext()
  const itemParams = useAccordionItemContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemParams), props)

  return <ark.div {...mergedProps} />
}
