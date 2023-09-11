import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowTipProps = HtmlArkProps<'div'>

export const PopoverArrowTip = forwardRef<HTMLDivElement, PopoverArrowTipProps>((props, ref) => {
  const { arrowTipProps } = usePopoverContext()
  const mergedProps = mergeProps(arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrowTip.displayName = 'PopoverArrowTip'
