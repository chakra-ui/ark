import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPositionerProps = HTMLArkProps<'div'>

export const HoverCardPositioner = (props: HoverCardPositionerProps) => {
  const hoverCard = useHoverCardContext()
  const positionerProps = mergeProps(() => hoverCard().positionerProps, props)
  return <ark.div {...positionerProps} />
}
