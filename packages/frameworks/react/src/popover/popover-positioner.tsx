import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverPositionerProps extends HTMLArkProps<'div'> {}

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(
  (props, ref) => {
    const api = usePopoverContext()
    const mergedProps = mergeProps(api.positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PopoverPositioner.displayName = 'PopoverPositioner'
