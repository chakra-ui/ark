import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { usePopoverContext } from './popover-context'

export interface PopoverContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

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
