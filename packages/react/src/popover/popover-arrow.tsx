import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HTMLArkProps<'div'>

export const PopoverArrow = forwardRef<'div'>((props, ref) => {
  const { arrowProps } = usePopoverContext()
  const mergedProps = mergeProps(arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
