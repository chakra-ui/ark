import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useTooltipContext } from './tooltip-context'

export interface TooltipContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const TooltipContent = (props: TooltipContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useTooltipContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps} fallback={<div {...api().contentProps} />}>
      <ark.div {...contentProps} />
    </Presence>
  )
}
