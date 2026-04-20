import * as presence from '@zag-js/presence'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useRef } from 'react'
import type { Optional } from '../../types'
import type { RenderStrategyProps } from '../../utils/render-strategy'
import { useEvent } from '../../utils/use-event'

export interface UsePresenceProps extends Optional<presence.Props, 'present'>, RenderStrategyProps {
  /**
   * Whether to allow the initial presence animation.
   * @default false
   */
  skipAnimationOnMount?: boolean | undefined
}
export type UsePresenceReturn = ReturnType<typeof usePresence>

export const usePresence = (props: UsePresenceProps = {}) => {
  const { lazyMount, unmountOnExit, present, skipAnimationOnMount = false, ...rest } = props
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
  } else if (unmountOnExit) {
    wasEverPresent.current = false
  }

  const unmounted = !api.present && (wasEverPresent.current ? unmountOnExit : lazyMount)

  const getPresenceProps = () => ({
    'data-state': api.skip && skipAnimationOnMount ? undefined : present ? 'open' : 'closed',
    hidden: !api.present,
  })

  return {
    ref: api.setNode,
    getPresenceProps,
    present: api.present,
    wasEverPresent: wasEverPresent.current,
    unmounted,
  }
}
