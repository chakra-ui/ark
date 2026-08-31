'use client'

import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useRef } from 'react'
import type { Optional } from '../../types.ts'
import { supportsActivity } from '../../utils/react-activity.ts'
import type { HideMode, RenderStrategyProps } from '../../utils/render-strategy.ts'
import { useEvent } from '../../utils/use-event.ts'

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
  /**
   * Function called when the animation ends in the open state.
   */
  // TODO(zag-bump): drop once @zag-js/presence v2 ports `onEnterComplete` back into its props.
  onEnterComplete?: VoidFunction | undefined
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean | undefined
}
export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: UsePresenceProps = {}) => {
  const { lazyMount, unmountOnExit, hideMode = 'display-none', present, skipAnimationOnMount = false, ...rest } = props
  const wasEverPresent = useRef(false)
  const machineProps: Partial<presence.Props> = {
    ...rest,
    present,
    onEnterComplete: useEvent(props.onEnterComplete),
    onExitComplete: useEvent(props.onExitComplete),
  } as Partial<presence.Props>

  const service = useMachine(presence.machine, machineProps)
  const api = presence.connect(service, normalizeProps)

  if (api.present) {
    wasEverPresent.current = true
  }

  const unmounted =
    (!api.present && !wasEverPresent.current && lazyMount) || (unmountOnExit && !api.present && wasEverPresent.current)

  const resolvedHideMode: HideMode = hideMode === 'activity' && supportsActivity ? 'activity' : 'display-none'

  const getPresenceProps = () => ({
    'data-state': api.skip && skipAnimationOnMount ? undefined : present ? 'open' : 'closed',
    hidden: resolvedHideMode === 'activity' ? false : !api.present,
  })

  return {
    ref: api.setNode,
    getPresenceProps,
    present: api.present,
    unmounted,
    hideMode: resolvedHideMode,
  }
}
