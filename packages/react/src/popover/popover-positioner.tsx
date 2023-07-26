import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLArkProps<'div'>

export const PopoverPositioner = forwardRef<'div'>((props, ref) => {
  const { positionerProps } = usePopoverContext()
  const mergedProps = mergeProps(positionerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
