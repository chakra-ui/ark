import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionButtonProps = HTMLArkProps<'button'>

export const AccordionButton = forwardRef<'button', AccordionButtonProps>((props, ref) => {
  const { getTriggerProps } = useAccordionContext()
  const itemContext = useAccordionItemContext()
  const mergedProps = mergeProps(getTriggerProps(itemContext), props)

  return <ark.button {...mergedProps} ref={ref} />
})
