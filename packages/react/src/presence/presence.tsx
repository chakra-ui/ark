import { Children, cloneElement, useRef, type ReactElement } from 'react'
import { createSplitProps } from '../create-split-props'
import { usePresence, type UsePresenceProps } from './use-presence'

export type PresenceProps = UsePresenceProps & {
  children: ReactElement
  lazyMount?: boolean
  unmountOnExit?: boolean
}

export const Presence = (props: PresenceProps) => {
  const [presenceProps, { children, lazyMount, unmountOnExit }] =
    createSplitProps<UsePresenceProps>()(props, ['present', 'onExitComplete'])
  const api = usePresence(presenceProps)
  const wasEverPresent = useRef(false)

  if (api.isPresent) {
    wasEverPresent.current = true
  }

  if (
    (!api.isPresent && !wasEverPresent.current && lazyMount) ||
    (unmountOnExit && !api.isPresent && wasEverPresent.current)
  ) {
    return null
  }

  const onlyChild = Children.only(children)
  return cloneElement(onlyChild, {
    ref: api.setNode,
    hidden: !api.isPresent,
    ['data-scope']: 'presence',
    ['data-state']: presenceProps.present ? 'open' : 'closed',
    ...onlyChild.props,
  })
}
