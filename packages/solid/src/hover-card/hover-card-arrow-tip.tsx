import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardArrowTipProps = HTMLArkProps<'div'>

export const HoverCardArrowTip = (props: HoverCardArrowTipProps) => {
  const hoverCard = useHoverCardContext()
  const tipProps = mergeProps(() => hoverCard().arrowTipProps, props)
  return <ark.div {...tipProps} />
}
