import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'
import { TooltipPresence, type TooltipPresenceProps } from './tooltip-presence'

export type TooltipContentProps = HTMLArkProps<'div'> & Omit<TooltipPresenceProps, 'children'>

export const TooltipContent = forwardRef<'div', TooltipContentProps>((props, ref) => {
  const [presenceProps, tooltipContentProps] = splitPresenceProps(props)

  return (
    <TooltipPresence {...presenceProps}>
      <InnerTooltipContent ref={ref} {...tooltipContentProps} />
    </TooltipPresence>
  )
})

const InnerTooltipContent = forwardRef<'div', HTMLArkProps<'div'>>((props, ref) => {
  const { contentProps } = useTooltipContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
