import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { HoverCardProvider } from './hover-card-context'
import { useHoverCard, type UseHoverCardProps, type UseHoverCardReturn } from './use-hover-card'

export type HoverCardProps = UseHoverCardProps & {
  children?: JSX.Element | ((state: UseHoverCardReturn) => JSX.Element)
}

export const HoverCard = (props: HoverCardProps) => {
  const [hoverCardProps, localProps] = createSplitProps<UseHoverCardProps>()(props, [
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
  const api = useHoverCard(hoverCardProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return <HoverCardProvider value={api}>{getChildren()}</HoverCardProvider>
}
