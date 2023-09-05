import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<PresenceProps, 'children'>

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = usePopoverContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <PopoverInnerContent ref={ref} {...localProps} />
    </Presence>
  )
})

PopoverContent.displayName = 'PopoverContent'

const PopoverInnerContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverInnerContent(props, ref) {
    const api = usePopoverContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
