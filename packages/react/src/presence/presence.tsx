import { Children, cloneElement, type ReactElement } from 'react'
import { createSplitProps } from '../create-split-props'
import { usePresence, type UsePresenceProps } from './use-presence'

export type PresenceProps = UsePresenceProps & { children: ReactElement }

export const Presence = (props: PresenceProps) => {
  const [presenceProps, { children }] = createSplitProps<UsePresenceProps>()(props, [
    'present',
    'onExitComplete',
  ])
  const api = usePresence(presenceProps)
  if (!api.isPresent) {
    return null
  }

  const onlyChild = Children.only(children)
  return cloneElement(onlyChild, {
    ref: api.setNode,
    ['data-scope']: 'presence',
    ['data-state']: presenceProps.present ? 'open' : 'closed',
    ...onlyChild.props,
  })
}
