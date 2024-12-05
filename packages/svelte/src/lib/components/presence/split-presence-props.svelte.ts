import { createSplitProps } from '$lib/utils/create-split-props'
import type { UsePresenceProps } from './use-presence.svelte'

export const splitPresenceProps = <T extends UsePresenceProps>(props: T) =>
  createSplitProps<UsePresenceProps>()(props, [
    'immediate',
    'lazyMount',
    'onExitComplete',
    'present',
    'unmountOnExit',
  ])
