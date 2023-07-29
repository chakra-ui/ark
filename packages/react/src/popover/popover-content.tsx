import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'
import { PopoverPresence, type PopoverPresenceProps } from './popover-presence'

export type PopoverContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<PopoverPresenceProps, 'children'>

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const [presenceProps, popoverContentProps] = splitPresenceProps(props)
  return (
    <PopoverPresence {...presenceProps}>
      <InnerPopoverContent ref={ref} {...popoverContentProps} />
    </PopoverPresence>
  )
})

PopoverContent.displayName = 'PopoverContent'

const InnerPopoverContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  (props, ref) => {
    const { contentProps } = usePopoverContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

InnerPopoverContent.displayName = 'InnerPopoverContent'
