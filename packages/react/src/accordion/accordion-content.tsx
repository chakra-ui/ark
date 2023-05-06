import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'>

export const AccordionContent = forwardRef<'div'>((props, ref) => {
  const { getContentProps } = useAccordionContext()
  const accordionItem = useAccordionItemContext()
  const mergedProps = mergeProps(getContentProps(accordionItem), props)

  return <ark.div {...mergedProps} ref={ref} />
})
