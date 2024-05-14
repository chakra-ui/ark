import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = (props: AccordionItemIndicatorProps) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const mergedProps = mergeProps(() => accordion().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
