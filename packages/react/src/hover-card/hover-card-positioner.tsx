import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPositionerProps = HTMLArkProps<'div'>

export const HoverCardPositioner = forwardRef<'div', HoverCardPositionerProps>((props, ref) => {
  const { positionerProps } = useHoverCardContext()
  const mergedProps = mergeProps(positionerProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
