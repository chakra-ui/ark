import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useTooltipContext } from './tooltip-context'

export interface TooltipContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const [presenceProps, tooltipContentProps] = splitPresenceProps(props)
  const api = useTooltipContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <TooltipInnerContent ref={ref} {...tooltipContentProps} />
    </Presence>
  )
})

TooltipContent.displayName = 'TooltipContent'

const TooltipInnerContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function TooltipInnerContent(props, ref) {
    const api = useTooltipContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
