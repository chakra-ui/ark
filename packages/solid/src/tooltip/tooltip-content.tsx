import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'
import { TooltipPresence, type TooltipPresenceProps } from './tooltip-presence'

export type TooltipContentProps = HTMLArkProps<'div'> & TooltipPresenceProps

export const TooltipContent = (props: TooltipContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useTooltipContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <TooltipPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </TooltipPresence>
  )
}
