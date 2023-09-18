import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLArkProps<'div'> & PresenceProps

export const TooltipContent = (props: TooltipContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useTooltipContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...contentProps} />
    </Presence>
  )
}
