import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTooltipContext } from './tooltip-context'
import { TooltipPresence } from './tooltip-presence'

export type TooltipContentProps = HTMLArkProps<'div'>

export const TooltipContent = forwardRef<'div', TooltipContentProps>((props, ref) => {
  const { contentProps } = useTooltipContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

export const TooltipContentWithPresence = forwardRef<'div', TooltipContentProps>((props, ref) => {
  const { contentProps } = useTooltipContext()
  const mergedProps = mergeProps(contentProps, props)

  return (
    <TooltipPresence>
      <ark.div {...mergedProps} ref={ref} />
    </TooltipPresence>
  )
})
