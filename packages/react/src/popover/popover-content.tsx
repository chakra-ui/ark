import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'
import { PopoverPresence, type PopoverPresenceProps } from './popover-presence'

export type PopoverContentProps = HTMLArkProps<'div'> & Omit<PopoverPresenceProps, 'children'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>((props, ref) => {
  const [presenceProps, popoverContentProps] = splitPresenceProps(props)
  return (
    <PopoverPresence {...presenceProps}>
      <InnerPopoverContent ref={ref} {...popoverContentProps} />
    </PopoverPresence>
  )
})

const InnerPopoverContent = forwardRef<'div', HTMLArkProps<'div'>>((props, ref) => {
  const { contentProps } = usePopoverContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
