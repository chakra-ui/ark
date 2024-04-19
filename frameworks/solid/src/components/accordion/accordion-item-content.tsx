import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { Collapsible } from '../collapsible'
import type { HTMLArkProps } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  const accordion = useAccordionContext()
  const itemProps = useAccordionItemPropsContext()
  const itemContentProps = createMemo(() => {
    const ownProps = accordion().getItemContentProps(itemProps)
    ownProps.hidden = undefined
    return ownProps
  })
  const mergedProps = mergeProps(itemContentProps, props)
  return <Collapsible.Content {...mergedProps} />
}
