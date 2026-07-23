'use client'

import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'
import { Activity, useRef } from 'react'
import type { Optional } from '../../types.ts'
import type { HideMode, RenderStrategyProps } from '../../utils/render-strategy.ts'
import { useEvent } from '../../utils/use-event.ts'

const supportsActivity = typeof Activity !== 'undefined'

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
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
    onExitComplete: useEvent(props.onExitComplete),
  }

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
