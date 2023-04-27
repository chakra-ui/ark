import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps } from './use-hover-card'

export type HoverCardProps = UseHoverCardProps & { children: JSX.Element }

export const HoverCard = (props: HoverCardProps) => {
  const [useHoverCardProps, restProps] = createSplitProps<UseHoverCardProps>()(props, [
    'closeDelay',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'onClose',
    'onOpen',
    'open',
    'openDelay',
    'positioning',
  ])
  const hoverCard = useHoverCard(useHoverCardProps)

  return <HoverCardProvider value={hoverCard}>{restProps.children}</HoverCardProvider>
}
