import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { HTMLArkProps } from '../../factory'
import { Collapsible } from '../collapsible'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  const context = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const itemContentProps = createMemo(() => {
    const ownProps = context().getItemContentProps(itemProps)
    ownProps.hidden = undefined
    return ownProps
  })
  const mergedProps = mergeProps(itemContentProps, props)
  return <Collapsible.Content {...mergedProps} />
}
