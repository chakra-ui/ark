import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HtmlArkProps<'div'> & Omit<PresenceProps, 'children'>

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

const TooltipInnerContent = forwardRef<HTMLDivElement, HtmlArkProps<'div'>>(
  function TooltipInnerContent(props, ref) {
    const { contentProps } = useTooltipContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
