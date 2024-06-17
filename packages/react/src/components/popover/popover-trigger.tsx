import { mergeProps } from '@zag-js/react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTriggerBaseProps extends PolymorphicProps {}
export interface PopoverTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PopoverTriggerBaseProps {}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    {
      ...popover.getTriggerProps(),
      'aria-controls': presence.unmounted ? undefined : popover.getTriggerProps()['aria-controls'],
    },
    props,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverTrigger.displayName = 'PopoverTrigger'
