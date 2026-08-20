import { createSplitProps } from '../../utils/create-split-props.ts'
import type { UsePresenceProps } from './use-presence.ts'

export const splitPresenceProps = <T extends UsePresenceProps>(props: T) =>
  createSplitProps<UsePresenceProps>()(props, [
    'immediate',
    'lazyMount',
    'onEnterComplete',
    'onExitComplete',
    'present',
    'skipAnimationOnMount',
    'unmountOnExit',
  ])
