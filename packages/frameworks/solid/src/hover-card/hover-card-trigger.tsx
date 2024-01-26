import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardTriggerProps extends HTMLArkProps<'button'> {}

export const HoverCardTrigger: ArkComponent<'button'> = (props) => {
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(() => hoverCard().triggerProps, props)

  return <ark.button {...mergedProps} />
}
