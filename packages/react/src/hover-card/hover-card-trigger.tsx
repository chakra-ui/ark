import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = HTMLArkProps<'a'>

export const HoverCardTrigger = forwardRef<'a', HoverCardTriggerProps>((props, ref) => {
  const { triggerProps } = useHoverCardContext()
  const mergedProps = mergeProps(triggerProps, props)
  return <ark.a {...mergedProps} ref={ref} />
})
