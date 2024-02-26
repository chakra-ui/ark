import { createSplitProps } from '../create-split-props'
import type { UsePresenceProps } from './use-presence'

export const splitPresenceProps = <T extends UsePresenceProps>(props: T) =>
  createSplitProps<UsePresenceProps>()(props, [
    'lazyMount',
    'onExitComplete',
    'present',
    'unmountOnExit',
  ])
