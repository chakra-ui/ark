import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps {}
export interface PopoverCloseTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PopoverCloseTriggerBaseProps {}

export const PopoverCloseTrigger = forwardRef<HTMLButtonElement, PopoverCloseTriggerProps>(
  (props, ref) => {
    const popover = usePopoverContext()
    const mergedProps = mergeProps(popover.getCloseTriggerProps(), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

PopoverCloseTrigger.displayName = 'PopoverCloseTrigger'
