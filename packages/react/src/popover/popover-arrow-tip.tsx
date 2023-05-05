import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverArrowTipProps = HTMLArkProps<'div'>

export const PopoverArrowTip = forwardRef<'div'>((props, ref) => {
  const { arrowTipProps } = usePopoverContext()
  const mergedProps = mergeProps(arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
