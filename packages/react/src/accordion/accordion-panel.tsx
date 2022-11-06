import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionPanelProps = HTMLArkProps<'div'>

export const AccordionPanel = forwardRef<'div', AccordionPanelProps>((props, ref) => {
  const { getContentProps } = useAccordionContext()
  const context = useAccordionItemContext()
  const mergedProps = mergeProps(getContentProps(context), props)

  return <ark.div {...mergedProps} ref={ref} />
})
