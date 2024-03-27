import { mergeProps } from '@zag-js/solid'
import { splitProps } from 'solid-js'
import { Collapsible } from '../collapsible'
import { type HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  const context = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const [, itemContentProps] = splitProps(context().getItemContentProps(itemProps), ['hidden'])
  const mergedProps = mergeProps(itemContentProps, props)

  return <Collapsible.Content {...mergedProps} />
}
