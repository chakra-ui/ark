import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardContentProps = HTMLArkProps<'div'>

export const HoverCardContent = (props: HoverCardContentProps) => {
  const hoverCard = useHoverCardContext()
  const contentProps = mergeProps(() => hoverCard().contentProps, props)
  return <ark.div {...contentProps} />
}
