import { createSplitProps } from '../../utils/create-split-props'
import type { UsePresenceProps } from './use-presence'

export const splitPresenceProps = <T extends UsePresenceProps>(props: T) =>
  createSplitProps<UsePresenceProps>()(props, [
    'immediate',
    'lazyMount',
    'onExitComplete',
    'present',
    'skipAnimationOnMount',
    'unmountOnExit',
  ])
