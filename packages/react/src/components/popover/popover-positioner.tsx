import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverPositionerBaseProps extends PolymorphicProps {}
export interface PopoverPositionerProps extends HTMLProps<'div'>, PopoverPositionerBaseProps {}

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>((props, ref) => {
  const popover = usePopoverContext()
  const presence = usePresenceContext()

  const mounting = !presence.unmounted && !presence.wasEverPresent
  useSafeLayoutEffect(() => {
    if (mounting) {
      popover.restartPositioning()
    }
  }, [mounting, popover])

  if (presence.unmounted) {
    return null
  }

  const mergedProps = mergeProps(popover.getPositionerProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverPositioner.displayName = 'PopoverPositioner'
