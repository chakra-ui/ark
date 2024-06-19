import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface HoverCardArrowTipProps extends HTMLProps<'div'>, HoverCardArrowTipBaseProps {}

export const HoverCardArrowTip = (props: HoverCardArrowTipProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getArrowTipProps(), props)

  return <ark.div {...mergedProps} />
}
