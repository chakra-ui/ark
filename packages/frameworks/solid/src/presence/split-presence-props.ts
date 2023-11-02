import { createSplitProps } from '../create-split-props'
import type { UsePresenceProps } from './use-presence'

export function splitPresenceProps<T>(props: T & UsePresenceProps) {
  return createSplitProps<UsePresenceProps>()(props, [
    'lazyMount',
    'onExitComplete',
    'present',
    'unmountOnExit',
  ])
}
