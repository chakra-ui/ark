import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HtmlArkProps<'div'>

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(
  (props, ref) => {
    const { positionerProps } = usePopoverContext()
    const mergedProps = mergeProps(positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PopoverPositioner.displayName = 'PopoverPositioner'
