import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverInnerArrowProps = HTMLArkProps<'div'>

export const PopoverInnerArrow = forwardRef<'div', PopoverInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = usePopoverContext()
  const mergedProps = mergeProps(innerArrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
