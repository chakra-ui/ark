import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPositionerProps = HTMLArkProps<'div'>

export const HoverCardPositioner = forwardRef<'div'>((props, ref) => {
  const { positionerProps } = useHoverCardContext()
  const mergedProps = mergeProps(positionerProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
