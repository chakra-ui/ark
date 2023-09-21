import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverArrowTipProps extends HTMLArkProps<'div'> {}

export const PopoverArrowTip = forwardRef<HTMLDivElement, PopoverArrowTipProps>((props, ref) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(api.arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrowTip.displayName = 'PopoverArrowTip'
