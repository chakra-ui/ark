import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HtmlArkProps<'div'>

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>((props, ref) => {
  const { arrowProps } = usePopoverContext()
  const mergedProps = mergeProps(arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrow.displayName = 'PopoverArrow'
