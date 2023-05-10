import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = HTMLArkProps<'button'>

export const HoverCardTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = useHoverCardContext()
  const mergedProps = mergeProps(triggerProps, props)
  return <ark.button {...mergedProps} ref={ref} />
})
