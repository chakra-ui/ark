import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowBaseProps extends PolymorphicProps<'div'> {}
export interface HoverCardArrowProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    HoverCardArrowBaseProps {}

export const HoverCardArrow = (props: HoverCardArrowProps) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}
