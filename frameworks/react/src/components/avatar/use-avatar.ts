import * as avatar from '@zag-js/avatar'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseAvatarProps extends Optional<avatar.Context, 'id'> {}
export interface UseAvatarReturn extends avatar.Api<PropTypes> {}

export const useAvatar = (props: UseAvatarProps = {}): UseAvatarReturn => {
  const initialContext: avatar.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
  }

  const context: avatar.Context = {
    ...initialContext,
    onStatusChange: useEvent(props.onStatusChange),
  }

  const [state, send] = useMachine(avatar.machine(initialContext), { context })
  return avatar.connect(state, send, normalizeProps)
}
