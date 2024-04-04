import { ark, type HTMLArkProps } from '../factory'
import { mergeProps } from '../merge-props'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = (props: AccordionItemIndicatorProps) => {
  const context = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
