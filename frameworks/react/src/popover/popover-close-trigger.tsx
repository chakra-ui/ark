import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverCloseTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverCloseTrigger = forwardRef<HTMLButtonElement, PopoverCloseTriggerProps>(
  (props, ref) => {
    const context = usePopoverContext()
    const mergedProps = mergeProps(context.closeTriggerProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PopoverCloseTrigger.displayName = 'PopoverCloseTrigger'
