import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardContentProps = HTMLArkProps<'div'>

export const HoverCardContent = forwardRef<'div', HoverCardContentProps>((props, ref) => {
  const { contentProps } = useHoverCardContext()
  const mergedProps = mergeProps(contentProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
