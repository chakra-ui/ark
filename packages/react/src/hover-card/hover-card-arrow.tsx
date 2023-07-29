import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowProps = ComponentPropsWithoutRef<typeof ark.div>

export const HoverCardArrow = forwardRef<HTMLDivElement, HoverCardArrowProps>((props, ref) => {
  const { arrowProps } = useHoverCardContext()
  const mergedProps = mergeProps(arrowProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})

HoverCardArrow.displayName = 'HoverCardArrow'
