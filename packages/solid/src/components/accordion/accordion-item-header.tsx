import type { ItemState } from '@zag-js/accordion'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useAccordionContext } from './use-accordion-context.ts'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context.ts'

export interface AccordionItemHeaderState extends ItemState {}

export interface AccordionItemHeaderBaseProps extends PolymorphicProps<'h3', AccordionItemHeaderState> {}
export interface AccordionItemHeaderProps extends HTMLProps<'h3'>, AccordionItemHeaderBaseProps {}

export const AccordionItemHeader = (props: AccordionItemHeaderProps) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const mergedProps = mergeProps(() => accordion().getItemHeaderProps(itemProps), props)

  return <ark.h3 {...mergedProps} state={accordion().getItemState(itemProps)} />
}
