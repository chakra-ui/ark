import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'
import { PopoverPresence, type PopoverPresenceProps } from './popover-presence'

export type PopoverContentProps = HTMLArkProps<'div'> & PopoverPresenceProps

export const PopoverContent = (props: PopoverContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = usePopoverContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <PopoverPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </PopoverPresence>
  )
}
