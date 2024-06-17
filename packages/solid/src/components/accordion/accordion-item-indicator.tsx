import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface AccordionItemIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    AccordionItemIndicatorBaseProps {}

export const AccordionItemIndicator = (props: AccordionItemIndicatorProps) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const mergedProps = mergeProps(() => accordion().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
