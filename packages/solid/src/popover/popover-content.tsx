import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLArkProps<'div'> & PresenceProps

export const PopoverContent = (props: PopoverContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = usePopoverContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}
