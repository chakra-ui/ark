import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionIconProps = HTMLArkProps<'div'>

export const AccordionIcon = forwardRef<'div'>((props, ref) => {
  const { isOpen, isDisabled, isFocused } = useAccordionItemContext()
  return (
    <ark.div
      data-open={isOpen || undefined}
      data-disabled={isDisabled || undefined}
      data-focused={isFocused || undefined}
      {...props}
      ref={ref}
    />
  )
})
