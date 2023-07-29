import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'
import { TooltipPresence, type TooltipPresenceProps } from './tooltip-presence'

export type TooltipContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<TooltipPresenceProps, 'children'>

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const [presenceProps, tooltipContentProps] = splitPresenceProps(props)

  return (
    <TooltipPresence {...presenceProps}>
      <InnerTooltipContent ref={ref} {...tooltipContentProps} />
    </TooltipPresence>
  )
})

TooltipContent.displayName = 'TooltipContent'

const InnerTooltipContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  (props, ref) => {
    const { contentProps } = useTooltipContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

InnerTooltipContent.displayName = 'InnerTooltipContent'
